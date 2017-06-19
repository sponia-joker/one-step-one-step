import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import './Stadiums.scss'
import Header from 'common/components/Header'
import Filter from 'common/components/Filter'
import Pagination from 'common/components/Pagination'
import Footer from 'common/components/Footer'
import { getStadiums } from '../modules/stadiums'
import { getStadiumsFilter } from 'common/actions/filter'
import List from 'common/components/List'
import logo_balck from 'assets/logo-black@2x.png'

class Stadiums extends Component {

  static propTypes={
    stadiumsList:PropTypes.array,
    total:PropTypes.number,
    getStadiums:PropTypes.func,
    getStadiumsFilter:PropTypes.func,
    getStadiumsOver:PropTypes.bool
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
    this.props.getStadiums(`${url}page=${page}`)
    window.scrollTo(0, 0)
  }
  handleSubmit = (filter) => {
    this.setState({ current:1, filter })
    const url = this.getUrl(filter)
    this.props.getStadiums(url)
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
    this.props.getStadiums()
    this.props.getStadiumsFilter()
  }

  render () {
    const title = ['场馆', '类型', '电话']
    const { stadiumsList, total, getStadiumsOver } = this.props
    return (
      <div className='stadiums-container'>
        <Helmet title='运动场馆 | 快体育' />
        <Header style={{ backgroundColor:'#fff' }} logo={logo_balck} />
        <div className='stadiums-list-container'>
          <div className='stadiums-list'>
            <Filter
              handleSubmit={this.handleSubmit}
              yearsVisible={false}
              industriesVisible={false}
              locationsVisible={false}
              roundsVisible={false}
              tagsVisible={false} />
            <List data={stadiumsList} total={total}
              title={title} type='Stadium' over={getStadiumsOver} />
            {
              stadiumsList && stadiumsList.length >= 1
              ? <div className='stadiums-pagination'>
                {
                    getStadiumsOver
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
  getStadiums,
  getStadiumsFilter
}

const mapStateToProps = (state) => ({
  stadiumsList:state.stadiums.stadiumsList,
  total:state.stadiums.total,
  getStadiumsOver:state.stadiums.getStadiumsOver
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stadiums)
