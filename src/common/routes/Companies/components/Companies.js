import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import './Companies.scss'
import Header from 'common/components/Header'
import Filter from 'common/components/Filter'
import Pagination from 'common/components/Pagination'
import Footer from 'common/components/Footer'
import { getCompanies } from '../modules/companies'
import List from 'common/components/List'
import logo_balck from 'assets/logo-black@2x.png'
import queryString from 'query-string'

class Companies extends Component {

  static propTypes={
    companiesList:PropTypes.array,
    total:PropTypes.number,
    getCompanies:PropTypes.func,
    getCompaniesOver:PropTypes.bool,
    location:PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      current:1,
      filter:{}
    }
  }
  onPageChange = (page) => {
    this.setState({ current:page })
    const url = this.getUrl(this.state.filter)
    this.props.getCompanies(`${url}page=${page}`)
    window.scrollTo(0, 0)
  }
  handleSubmit = (filter) => {
    this.setState({ current:1, filter })
    const url = this.getUrl(filter)
    this.props.getCompanies(url)
  }
  getUrl = (filter) => {
    let url = ''
    Object.values(filter).map(filterArray => {
      filterArray && filterArray.map(filter => {
        url += `${filter.dataName}=${filter.dataValue}&`
      })
    })
    return url.replace(/\+/g, '%2B')// 防止+号被转义
  }

  componentDidMount () {
    if (this.props.companiesList) {
      this.props.getCompanies()
    }
  }

  render () {
    const title = ['公司', '地区', '子行业', '成立时间', '轮次']
    const { companiesList, total, getCompaniesOver, match} = this.props
    const {location:{ search }} = this.props
    const query = queryString.parse(search)
    return (
      <div className='companies-container'>
        <Helmet title='创业公司 | 快体育' />
        <Header style={{ backgroundColor:'#fff' }} logo={logo_balck} />
        <div className='companies-list-container'>
          <div className='companies-list'>
            <Filter handleSubmit={this.handleSubmit}
              yearsVisible={false}
              typesVisible={false}
              companySelectId={query.select_id}
              citysVisible={false} />
            <List data={companiesList} total={total}
              title={title} type='Company' over={getCompaniesOver} />
            {
              companiesList && companiesList.length >= 1
              ? <div className='companies-pagination'>
                {
                    getCompaniesOver
                    ? <Pagination
                      onChange={this.onPageChange}
                      current={this.state.current}
                      total={total}
                      pageSize={15} /> : null
                    }
              </div> : null
            }
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapDispatchToProps = {
  getCompanies
}

const mapStateToProps = (state) => ({
  companiesList:state.companies.companiesList,
  total:state.companies.total,
  getCompaniesOver:state.companies.getCompaniesOver
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Companies)
