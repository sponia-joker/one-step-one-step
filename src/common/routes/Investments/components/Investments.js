import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import './Investments.scss'
import Header from 'common/components/Header'
import Filter from 'common/components/Filter'
import Pagination from 'common/components/Pagination'
import Footer from 'common/components/Footer'
import { getInvestments } from '../modules/investments'
import List from 'common/components/List'
import logo_balck from 'assets/logo-black@2x.png'
import queryString from 'query-string'

class Investments extends Component {

  static propTypes={
    investmentsList:PropTypes.array,
    total:PropTypes.number,
    getInvestments:PropTypes.func,
    getInvestmentsOver:PropTypes.bool,
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
    this.props.getInvestments(`${url}page=${page}`)
    window.scrollTo(0, 0)
  }
  handleSubmit = (filter) => {
    this.setState({ current:1, filter })
    const url = this.getUrl(filter)
    this.props.getInvestments(url)
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
    if (!this.props.investmentsList) {
      this.props.getInvestments()
    }
  }

  render () {
    const title = ['公司', '轮次', '融资金额', '投资者', '时间']
    const { investmentsList, total, getInvestmentsOver, match } = this.props
    const {location:{ search }} = this.props
    const query = queryString.parse(search)
    return (
      <div className='investments-container'>
        <Helmet title={`融资数据 | 快体育`} />
        <Header style={{ backgroundColor:'#fff' }} logo={logo_balck} />
        <div className='investments-list-container'>
          <div className='investments-list'>
            <Filter handleSubmit={this.handleSubmit}
              tagsVisible={false}
              investmentSelectId={query.select_id}
              typesVisible={false}
              citysVisible={false} />
            <List data={investmentsList} total={total}
              title={title} type='Investment' over={getInvestmentsOver} />
            {
              investmentsList && investmentsList.length >= 1
              ? <div className='investments-pagination'>
                {
                  getInvestmentsOver
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
  getInvestments
}

const mapStateToProps = (state) => ({
  investmentsList:state.investments.investmentsList,
  total:state.investments.total,
  getInvestmentsOver:state.investments.getInvestmentsOver
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Investments)
