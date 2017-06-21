import React from 'react'
import Helmet from 'react-helmet'
import './404.scss'
import Header from 'common/components/Header'
import Footer from 'common/components/Footer'
import NotFoundImg from 'assets/word-contact-not-found@2x.png'
import { Link } from 'react-router-dom'
import logo_balck from 'assets/logo-black@2x.png'

export const NotFound = () => (
  <div className='not-found-container'>
    <Helmet title='404 | 快体育' />
    <Header style={{ backgroundColor:'#fff' }}
      logo={logo_balck} />
    <div className='not-found-content'>
      <div className='word-not-found-us'>
        <img src={NotFoundImg} alt='' height='90px' />
        <div className='not-found'>
          找不到此页面了
        </div>
        <Link className='back-to-index' to='/'>
            返回首页
        </Link>
      </div>

    </div>
    <Footer />
  </div>

)
export default NotFound

