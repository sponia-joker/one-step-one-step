import React from 'react'
import Helmet from 'react-helmet'
import './About.scss'
import Header from 'common/components/Header'
import Footer from 'common/components/Footer'
import aboutUs from 'assets/word-about-us@2x.png'
import logo_balck from 'assets/logo-black@2x.png'

export const About = () => (
  <div className='about-container'>
    <Helmet title='关于我们 | 快体育' />
   <Header style={{ backgroundColor:'#fff' }} logo={logo_balck} />
    <div className='about-content'>
      <div className='word-about-us'>
        <img src={aboutUs} alt='' height='90px' />
        <div className='word'>
          关于我们
        </div>
      </div>
      <div className='about-description'>
          快体育是一家聚焦于体育行业的公司数据库和信息服务提供商。
          我们通过挖掘、汇集、加工、处理体育行业的商业数据，帮助体育创业者和投资者更快更便捷地获取行业数据。
          提供的信息包括但不限于风险投资、收购、公司资料、团队资料、业务需求对接等。
      </div>
    </div>
    <Footer />
  </div>
)
export default About

