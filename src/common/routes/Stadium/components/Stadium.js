import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from 'common/components/Header'
import Footer from 'common/components/Footer'
import './Stadium.scss'
import { getStadium } from '../modules/stadium'
import { connect } from 'react-redux'
import Breadcrumb from 'common/components/Breadcrumb'
import Profile from './Profile'
import Similar from './Similar'
import Companies from './Companies'
import Card from 'common/components/Card'
import Slider from 'common/components/Slider'
import NoRecord from 'common/components/NoRecord'
import logo_balck from 'assets/logo-black@2x.png'

export class Stadium extends Component {

  static propTypes = {
    params:PropTypes.object,
    getStadium:PropTypes.func,
    stadium:PropTypes.object
  }
  componentDidMount () {
    const { params:{ stadium_id } } = this.props.match
    this.props.getStadium(stadium_id)
  }
  render () {
    const { stadium, getStadium } = this.props
    return (
      stadium
        ? <div className='stadium-wrap'>
          <Helmet title={`${stadium && stadium.name || '场馆详情'} | 快体育`} />
          <Header style={{ backgroundColor:'#fff' }} logo={logo_balck} />
          <div className='stadium'>
            <Breadcrumb
              path={[
              { link:'/', name:'首页' },
              { link:'/stadiums', name:'场馆' },
              { link:`/stadium/${stadium.id}`, name:stadium.name }
              ]}
              style={{ textAlign:'left' }}
          />
            <div className='stadium-left'>
              <div className='stadium-profile-wrap'>
                <Profile
                  stadium={stadium}
              />
              </div>
              <div className='stadium-companies-wrap'>
                <Companies
                  data={stadium.companies}
                  title='场馆相关公司'
             />
              </div>
              <div className='stadium-images-wrap'>
                <Card title='场馆图片'>
                  {
                  stadium.images && stadium.images.length ? <Slider images={stadium.images} /> : <NoRecord />
                }
                </Card>
              </div>
            </div>
            <div className='stadium-right'>
              <Similar
                data={stadium.similar_stadiums}
                title='相似场馆'
                getStadium={getStadium} />
            </div>
          </div>
          <Footer />

        </div> : null
    )
  }
}
const mapDispatchToProps = {
  getStadium
}
const mapStateToProps = (state) => ({
  stadium:state.stadium.data

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stadium)

