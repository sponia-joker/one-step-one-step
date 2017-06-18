import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
// import company_default_logo from 'assets/img-default-company@2x.png'
import { transformAmount } from 'tools'
import Image from 'common/components/Image'

class Investment extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  render () {
    const investment = this.props.data
    const company = investment.company
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
            <p>{
            company.industries && company.industries.map(industry => {
              let sub_industry_name = ''
              industry.children && industry.children.map(sub_industry => {
                sub_industry_name += sub_industry.name
              })
              return `${industry.name}${sub_industry_name ? `-${sub_industry_name}` : ''}`
            })

          }</p>
          </div>
        </div>
        <span>{investment.round}</span>
        <span>
          {
              investment.amount && investment.amount !== 0
              ? `${transformAmount(investment.amount)}${investment.currency
              ? investment.currency : ''}` : investment.approximation
              ? `${investment.approximation}${investment.currency ? investment.currency : ''}` : '不明确'
            }
        </span>
        <span>
          {
          investment.investors && investment.investors.map((investor, index) => {
            if (index < 3) {
              return <label key={index}>{investor}</label>
            }
            if (index === 3) {
              return <label key={index}>...</label>
            }
          })
        }
        </span>
        <span>{investment.date ? moment(investment.date).format('YYYY.MM') : '未知'}</span>
      </li>
    )
  }
}

export default Investment
