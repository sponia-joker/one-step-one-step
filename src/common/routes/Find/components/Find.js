import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import './Find.scss'
import Header from 'common/components/Header'
import Pagination from 'common/components/Pagination'
import Footer from 'common/components/Footer'
import List from 'common/components/List'
import { getSearchCompany, getSearchPeople } from 'common/actions/search'
import logo_balck from 'assets/logo-black@2x.png'
import queryString from 'query-string'

class Find extends Component {

  static propTypes={
    getSearchCompany:PropTypes.func,
    getSearchPeople:PropTypes.func,
    location:PropTypes.object,
    companyList:PropTypes.array,
    peopleList:PropTypes.array,
    peopleSearchOver:PropTypes.bool,
    companySearchOver:PropTypes.bool,
    peopleTotal:PropTypes.number,
    companyTotal:PropTypes.number
  }
  onCompanyPageChange = (page) => {
    this.setState({ companyCurrent:page })
    this.props.getSearchCompany(this.state.value, page)
    window.scrollTo(0, 0)
  }
  onPeoplePageChange = (page) => {
    this.setState({ peopleCurrent:page })
    this.props.getSearchPeople(this.state.value, page)
    window.scrollTo(0, 0)
  }
  constructor (props) {
    super(props)
    this.state = {
      peopleCurrent:1,
      companyCurrent:1,
      type:'company',
      value:''
    }
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }
  handleSubmit = () => {
    const { getSearchCompany, getSearchPeople } = this.props
    getSearchPeople(this.state.value)
    getSearchCompany(this.state.value)
    this.setState({
      peopleCurrent:1,
      companyCurrent:1,
      type:'company'
    })
  }
  componentDidMount () {
    const {  getSearchCompany, getSearchPeople } = this.props
    const {location:{ search }} = this.props
    const query = queryString.parse(search);
    this.setState({ value:query.q })
    getSearchPeople(query.q ? query.q : '')
    getSearchCompany(query.q ? query.q : '')
  }
  onClick = (type) => {
    const { getSearchCompany, getSearchPeople } = this.props
    if (type === 'company') {
      this.setState({ type:'company' })
      getSearchCompany(this.state.value, this.state.companyCurrent)
    } else {
      this.setState({ type:'people' })
      getSearchPeople(this.state.value, this.state.peopleCurrent)
    }
  }
  onKeyUp = (event) => {
    const { getSearchCompany, getSearchPeople } = this.props
    if (event.keyCode === 13) {
      this.setState({ peopleCurrent:1, companyCurrent:1, type:'company' })
      getSearchPeople(this.state.value)
      getSearchCompany(this.state.value)
    }
  }

  render () {
    const { companyList, peopleList, companyTotal,
            companySearchOver, peopleSearchOver, peopleTotal } = this.props
    const title = this.state.type === 'company'
    ? ['公司', '地区', '子行业', '成立时间', '轮次'] : ['人物', '简介']
    return (
      <div className='find-companies-container'>
        <Helmet title={`搜索结果 | 快体育`} />
        <Header style={{ backgroundColor:'#fff' }} logo={logo_balck} search={false} />
        <div className='companies-list-container'>
          <div className='companies-list-search'>
            <div className='find-search'>
              <form className='find-search-form'>
                <input
                  value={this.state.value || ''}
                  onChange={this.handleChange}
                  type='text'
                  placeholder='输入公司、人名'
                  className='find-search-form-input'
                  onKeyUp={this.onKeyUp}
                      />
                <input type='text' style={{ display:'none' }} />
                <span className='find-search-form-submit'>
                  <input type='button' value='' onClick={this.handleSubmit} />
                </span>
              </form>
            </div>
          </div>
          <div className='companies-list-tab'>
            <span className={this.state.type === 'company' ? 'active' : 'no-active'}
              onClick={() => this.onClick('company')}>创业公司（{companyTotal}）</span>
            <span className={this.state.type === 'people' ? 'active' : 'no-active'}
              onClick={() => this.onClick('people')}>人物（{peopleTotal}）</span>
          </div>
          <div className='companies-list'>
            {
            this.state.type === 'company'
            ? <List title={title} type={'Company'} data={companyList} over={companySearchOver} />
            : <List title={title} type={'People'} data={peopleList} over={peopleSearchOver} />
          }
            {
              this.state.type === 'company'
              ? <div className='companies-pagination'>
                {
              companySearchOver && companyList.length >= 1
              ? <Pagination
                onChange={this.onCompanyPageChange}
                current={this.state.companyCurrent}
                total={companyTotal}
                pageSize={15} /> : null
              }
              </div> : <div className='companies-pagination'>
                {
              peopleSearchOver && peopleList.length >= 1
              ? <Pagination
                onChange={this.onPeoplePageChange}
                current={this.state.peopleCurrent}
                total={peopleTotal}
                pageSize={15} /> : null
              }
              </div>
            }
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapDispatchToProps = {
  getSearchCompany, getSearchPeople
}

const mapStateToProps = (state) => ({
  companyList:state.commonSearch.companyList,
  companyTotal:state.commonSearch.companyTotal,
  peopleList:state.commonSearch.peopleList,
  peopleTotal:state.commonSearch.peopleTotal,
  peopleSearchOver:state.commonSearch.peopleSearchOver,
  companySearchOver:state.commonSearch.companySearchOver

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Find)
