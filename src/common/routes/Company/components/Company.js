import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import './Company.scss'
import Header from 'common/components/Header'
import Footer from 'common/components/Footer'
import { getCompany } from '../modules/company'
import NoRecord from 'common/components/NoRecord'
import Contact from './Contact'
import Profile from './Profile'
import Products from './Products'
import Stadiums from './Stadiums'
import Milestones from './Milestones'
import Slider from 'common/components/Slider'
import Card from 'common/components/Card'
import Investments from './Investments'
import News from './News'
import Team from './Team'
import Similar from './Similar'
import logo_balck from 'assets/logo-black@2x.png'
import { Link } from 'react-router-dom'

class Company extends Component {

  static propTypes={
    params:PropTypes.object,
    getCompany:PropTypes.func,
    company:PropTypes.object
  }
  componentDidMount () {
     const {match} = this.props 
    if (!this.props.company) {
      const { params:{ company_id } } = match
      this.props.getCompany(company_id)
      }
  }
  render () {
    const { company } = this.props
    return (
        company ? <div className='company-container'>
          <Helmet title={`${company && company.short_name || '人物详情'} | 快体育`} />
          <Header style={{ backgroundColor:'#fff' }} logo={logo_balck} />
          <div className='company-profile-contaier'>
            <Profile company={company} />
          </div>
          <div className='company-main-box'>
            <div className='company-main'>
              <div className='company-main-left'>
                <ul>
                  <li>
                    <div className='company-basic-wrap'>
                      <div className='company-basic'>
                        <Card title='基本信息'>
                          {
                            company.images && company.images.length >= 1 && <Slider images={company.images} />
                          }
                          {
                            company.description && <div className='company-basic-description'>
                                {company.description}
                              </div>
                          }
                          {
                            !company.description && !company.images && <NoRecord />
                          }
                        </Card>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='company-product-wrap'>
                      <Products title='公司产品' data={company.products} />
                    </div>
                  </li>
                  <li>
                    <div className='company-investments-wrap'>
                      <Investments
                        title='融资信息'
                        subtitle={company.fund_need}
                        data={company.investments} />
                    </div>
                  </li>
                  <li>
                    <div className='company-stadiums-wrap'>
                      <Stadiums title='相关场馆' data={company.stadiums} company_id={company.id} />
                    </div>
                  </li>
                  <li>
                    <div className='company-team-wrap'>
                      <Team title='团队信息' data={company.people} />
                    </div>
                  </li>
                  <li>
                    <div className='company-news-wrap'>
                      <News title='新闻' data={company.pieces_of_news} />
                    </div>
                  </li>
                  <li>
                    <div className='company-milestones-wrap'>
                      <Milestones title='里程碑' data={company.milestones} />
                    </div>
                  </li>
                </ul>
              </div>
              <div className='company-main-right'>
                <Contact company={company} />
                <div className='company-similar-wrap'>
                  <Similar title='国内相似公司' data={
                    company.similar_companies &&
                    company.similar_companies.filter(company => company.location_type !== 'abroad')
                  } />
                </div>
                <div className='company-similar-wrap'>
                  <Similar title='国外相似公司' data={
                    company.similar_companies &&
                    company.similar_companies.filter(company => company.location_type === 'abroad')
                  } />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div> : null
    )
  }
}

const mapDispatchToProps = {
  getCompany
}

const mapStateToProps = (state) => ({
  company:state.company.data
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company)
