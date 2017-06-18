import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Footer.scss'

class Footer extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  render () {
    return (
      <div className='footer'>
        <ul>
          <li><a href='/about'>关于我们</a></li>
          <li><a href='/contact'>联系我们</a></li>
          <li><a href='https://jinshuju.net/f/7oByrp' target='_blank'>添加公司</a></li>
          <li><a href='https://jinshuju.net/f/SJf7Hi' target='_blank'>意见反馈</a></li>
          <li>
            <span>
              Copyright © 2017 快体育 粤ICP备15046654号-4
            </span>
          </li>
        </ul>
      </div>
    )
  }
}

export default Footer
