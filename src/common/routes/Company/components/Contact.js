import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Contact extends Component {
  static propTypes = {
    company: PropTypes.object
  };
  render () {
    const { company } = this.props
    return (
      <div className='company-contact'>
        <div className='company-header'>
          <span>联系方式</span>
        </div>
        <div className='company-contact-list'>
          <ul className='left'>
            <li>
              <span>邮箱：</span>
              {
                            company.email
                            ? <span>{company.email}</span>
                            : <span style={{ color:'#999' }}>不明确</span>
                          }
            </li>
            <li>
              <span>电话：</span>
              {
                            company.telephone
                            ? <span>{company.telephone}</span>
                            : <span style={{ color:'#999' }}>不明确</span>
                          }
            </li>
            <li>
              <span>地址：</span>
              {
                            company.address
                            ? <span>{company.address}</span>
                            : <span style={{ color:'#999' }}>不明确</span>
              }
            </li>
            <li>
              <span>微博：</span>
              {
                            company.weibo_url
                            ? <span><a href={company.weibo_url} target='_blank'>{company.weibo_url}</a></span>
                            : <span style={{ color:'#999' }}>不明确</span>
                          }
            </li>
            <li>
              <span>公众号：</span>
              {
                            company.weixin
                            ? <span>{company.weixin}</span>
                            : <span style={{ color:'#999' }}>不明确</span>
                          }
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Contact
