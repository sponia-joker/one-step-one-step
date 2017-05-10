import React from 'react'
import PropTypes from 'prop-types'
import './Banner.scss'
import Search from 'components/Search'

const Banner = () => (
    <div className="home-banner">
      <div className="home-banner-middle">
        <div className="home-banner-title">
          <h1>体育与健康产业项目平台</h1>
        </div>
        <div className="home-banner-search">
          <Search/>
        </div>
      </div>
    <div className="home-banner-bottom">
      
    </div>
  </div>
)
export default Banner
