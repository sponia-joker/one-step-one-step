import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
// import company_default_logo from 'assets/img-default-company@2x.png'
import Image from 'common/components/Image'

class Company extends Component {
  static propTypes = {
    data: PropTypes.object
  };
  render () {
    const company = this.props.data
    return (
      <li>
        <div className='logo-container'>
          <div className='logo'>
            <Image
              height={80}
              width={80}
              url={company.logo}
              link={`/company/${company.id}`}
              radius={8} />
          </div>
          <div className='logo-text'>
            <a href={`/company/${company.id}`} className='company-link' target='_blank'>{company.short_name}</a>
            <p>{company.description}</p>
          </div>
        </div>
        <span>{company.location.province}</span>
        <span>{
                company.industries && company.industries.map(industry => {
                  return industry.children ? industry.children.map(sub_industry => {
                    return sub_industry.name
                  }) : industry.name
                })
              }</span>
        <span>{company.founded_date ? moment(company.founded_date).format('YYYY.MM') : '未知'}</span>
        <span>{company.round}</span>
      </li>
    )
  }
}

export default Company
