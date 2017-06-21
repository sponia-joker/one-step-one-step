import React from 'react'
import Helmet from 'react-helmet'
import './Contact.scss'
import Header from 'common/components/Header'
import Footer from 'common/components/Footer'
import contactUs from 'assets/word-contact@2x.png'
import logo_balck from 'assets/logo-black@2x.png'

export const Contact = () => (
  <div className='contact-container'>
    <Helmet title={`联系我们 | 快体育`} />
    <Header style={{ backgroundColor:'#fff' }} logo={logo_balck} />
    <div className='contact-content'>
      <div className='word-contact-us'>
        <img src={contactUs} alt='' height='90px' />
        <div className='contact'>
          联系我们
        </div>
      </div>
      <div className='contact-list'>
        <div className='bussiess'>
          <span>商务合作</span>
          <p>hi@faxports.com</p>
        </div>
        <div className='advise'>
          <span>反馈建议</span>
          <p>hi@faxports.com</p>
        </div>

      </div>
    </div>
    <Footer />
  </div>
)
export default Contact

