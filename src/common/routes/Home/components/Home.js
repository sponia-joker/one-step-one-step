import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Home.scss'
import { getIndustriesHot, getInvestmentsHot, getKeywords } from '../modules/home'
import feature1 from 'assets/home-feature1@2x.png'
import feature2 from 'assets/home-feature2@2x.png'
import feature3 from 'assets/home-feature3@2x.png'
import Header from 'common/components/Header'
import Footer from 'common/components/Footer'
import Image from 'common/components/Image'
import { transformAmount } from 'tools'
import logo_white from 'assets/logo-white@2x.png'

class Home extends Component {
  static propTypes = {
    getIndustriesHot: PropTypes.func,
    industries:PropTypes.array,
    investmentsForeign:PropTypes.array,
    investmentsDomestic:PropTypes.array,
    getInvestmentsHot:PropTypes.func,
    keywords:PropTypes.array,
    getKeywords:PropTypes.func

  };
  constructor (props) {
    super(props)
    this.state = {
      value:'',
      active:'domestic'
    }
  }
  componentDidMount () {
    this.props.getKeywords()
    this.props.getIndustriesHot()
    this.props.getInvestmentsHot('国内')
    this.props.getInvestmentsHot('国外')
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }
  changeInvestment = (country) => {
    if (country === 'domestic') {
      this.setState({ active:'domestic' })
    } else {
      this.setState({ active:'foreign' })
    }
  }
  render () {
    const { industries, investmentsForeign, investmentsDomestic, keywords } = this.props
    const investmentsForeignDomestic = [
          { investments:investmentsForeign, active:'foreign' },
          { investments:investmentsDomestic, active:'domestic' }
    ]
    return (
      <div className='home-container'>
        <Helmet title={`快体育 | 体育与健康产业项目平台`} />
        <div className='home-top'>
          <Header search={false} logo={logo_white} fontColor='#fff' hover={false} style={{ border:'0' }} />
          <div className='home-title'>
            <h1>体育与健康产业项目平台</h1>
          </div>
          <div className='home-search'>
            <form className='home-search-form' action='/search'>
              <input
                value={this.state.value || ''}
                type='text'
                name='q'
                onChange={this.handleChange}
                placeholder='输入公司、人名'
                className='home-search-form-input'
              />
              <span className='home-search-form-submit'>
                <input type='submit' value='' />
              </span>
            </form>
            <div className='home-search-example'>
              {
                keywords && keywords.map((keyword, index) => (
                  <span key={index}>
                    <Link to={`/search?q=${keyword.name}`}>{keyword.name}</Link>
                  </span>
                ))
              }
            </div>
          </div>

        </div>
        <div className='home-background' />
        <div className='home-feature'>
          <ul>
            <li>
              <div className='home-feature-image'>
                <img src={feature1} alt='' width='128px' height='128px' />
              </div>
              <div className='home-feature-text'>
                <span className='home-feature-text-title'>用数据解读体育</span>
                <span className='home-feature-text-content'>49个细分领域，数千家体育公司，上万笔融资数据</span>
              </div>
            </li>
            <li>
              <div className='home-feature-image'>
                <img src={feature2} alt='' width='128px' height='128px' />
              </div>
              <div className='home-feature-text'>
                <span className='home-feature-text-title'>国内外融资速递</span>
                <span className='home-feature-text-content'>不错过每一笔体育融资资讯，紧跟行业热点</span>
              </div>
            </li>
            <li>
              <div className='home-feature-image'>
                <img src={feature3} alt='' width='128px' height='128px' />
              </div>
              <div className='home-feature-text'>
                <span className='home-feature-text-title'>发掘行业潜力股</span>
                <span className='home-feature-text-content'>大数据结合人工分析，发掘被忽视的潜力股</span>
              </div>
            </li>
          </ul>
        </div>
        <div className='home-middle'>
          <div className='home-investment-tab'>
            <div className='home-investment-tab-title'>
              <ul>
                <li>
                  <a href='javascript:;'
                    className={this.state.active === 'domestic' ? 'tab-active' : 'no-tab-active'}
                    onMouseOver={() => this.changeInvestment('domestic')}>国内融资</a>
                  {
                    this.state.active === 'domestic' ? <span /> : null
                  }
                </li>
                <li><a href='javascript:;'
                  className={this.state.active === 'foreign' ? 'tab-active' : 'no-tab-active'}
                  onMouseOver={() => this.changeInvestment('foreign')}>国外融资</a>
                  {
                    this.state.active === 'foreign' ? <span /> : null
                  }
                </li>
                <li>
                  <Link
                    to={`/investments?selectId=${this.state.active === 'foreign' ? '20000000' : '10000000'}`}>
                  更多融资</Link>
                </li>
              </ul>
            </div>
            {
              investmentsForeignDomestic && investmentsForeignDomestic.map((entry, parentIndex) => {
                return <div className='home-investment-tab-content'
                  style={{ display:entry.active === this.state.active ? 'inline-block' : 'none' }}
                  key={parentIndex}>
                  {
                entry.investments && entry.investments.map((investment, index) => {
                  const company = investment.company
                  return (
                    <div className='content-detail' key={index}>
                      <ul>
                        <li className='content-detail-logo'>
                          <Image
                            height={100}
                            width={100}
                            url={company.logo}
                            link={`/company/${company.id}`} />
                        </li>
                        <li className='content-detail-title'>
                          <Link to={`/company/${company.id}`}>{company.short_name}</Link>
                        </li>
                        <li className='content-detail-category'>
                          <span>
                            {
                            company.industries && company.industries.map(industry => {
                              return industry.children ? industry.children.map(sub_industry => {
                                return sub_industry.name
                              }) : industry.name
                            })
                          }
                          </span>
                        </li>
                        <li className='content-detail-description'>
                          {company.description}
                        </li>
                        <li className='content-detail-investment'>
                          {
                              investment.amount && investment.amount !== 0
                              ? `${transformAmount(investment.amount)}${investment.currency ? investment.currency : ''}`
                              : investment.approximation
                              ? `${investment.approximation}${investment.currency ? investment.currency : ''}` : '不明确'
                            }
                          <span>{investment.round ? investment.round : '未知'}</span>
                        </li>
                      </ul>
                    </div>
                  )
                })
              }
                </div>
              })
            }

          </div>
          {
            industries && industries.map((industry, index) => {
              return (
                <div className='home-category' key={index}>
                  <div className='home-category-example'>
                    <div className='example-title'>
                      {`${industry.name}相关创业公司`}
                      <span> <Link to={`/companies?select_id=${industry.id}`}>更多公司</Link></span>
                    </div>
                    <div className='example-content'>
                      {
                  industry.companies && industry.companies.map(company => {
                    return (
                      <div className='example-content-detail' key={company.id}>
                        <div className='example-content-detail-left'>
                          <Image
                            height={100}
                            width={100}
                            url={company.logo}
                            link={`/company/${company.id}`} />
                        </div>
                        <div className='example-content-detail-right'>
                          <ul>
                            <li>
                              <Link to={`/company/${company.id}`}>{company.short_name}</Link>
                            </li>
                            <li>
                              <span>{company.location.city}</span>
                              <span>{company.round ? company.round : '未知'}</span>
                            </li>
                            <li>
                              {
                                    company.description
                                  }
                            </li>
                          </ul>
                        </div>
                      </div>
                    )
                  })
                }

                    </div>
                  </div>
                </div>
              )
            })
          }
          <div className='home-add-company-container'>
            <div className='home-add-company'>
              <div className='title'>
              想让你的公司被更多体育投资人看到？快来添加公司吧。
              </div>
              <div className='add-company-button'>
                <a href='https://jinshuju.net/f/7oByrp' target='_blank'>添加公司</a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapDispatchToProps = {
  getIndustriesHot, getInvestmentsHot, getKeywords
}

const mapStateToProps = (state) => ({
  industries:state.home.industries,
  investmentsForeign:state.home.investmentsForeign,
  investmentsDomestic:state.home.investmentsDomestic,
  keywords:state.home.keywords
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
