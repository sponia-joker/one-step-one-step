import React from 'react'
import PropTypes from 'prop-types'
import './Profile.scss'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Image from 'common/components/Image'
import { transformAmount, singleLineString } from 'tools'

export const Profile = ({ company }) => {
  return (
    <div className='company-profile'>
      <div className='company-profile-crumbs'>
        <span>
          <Link to='/'>首页</Link> &nbsp;/ &nbsp;
                  <Link to='/companies'>创业公司</Link>&nbsp;/ &nbsp;
                  <Link to={`/company/${company.id}`}>{company.short_name}</Link>&nbsp;
        </span>
      </div>
      <div className='company-profile-info'>
        <div className='logo'>
          <Image height={160} width={160} url={company.logo} link={`/company/${company.id}`} radius={16} />
        </div>
        <div className='meta'>
          <div className='meta-name'>
            <p>{company.short_name}
              <label>({company.round ? company.round : '未知'})</label>
            </p>
            <span>{company.operation_status ? company.operation_status : '未知'}</span>
          </div>
          <ul className='info-meta-other'>
            <li>
              {
                company.website
                  ? <a href={company.website} target='_black'>{company.website}</a>
                  : <span style={{ color:'#999' }}>未收录网站</span>
              }
            </li>
            <li>
              <span>公司全称：{company.long_name}</span>
            </li>
            <li>
              {
                company.industries && company.industries.length >= 1
                  ? <span>{
                    company.industries.map(industry => {
                      let sub_industry_name = ''
                      industry.children && industry.children.map(sub_industry => {
                        sub_industry_name += sub_industry.name
                      })
                      return `${industry.name} ${sub_industry_name ? `- ${sub_industry_name}` : ''}`
                    })
                  }
                  </span> : <span style={{ color:'#999' }}>未收录行业</span>
              }
            </li>
            <li>
              <span>
              公司规模：
               {
                 company.scale && company.scale !== '不明确'
                 ? <label>{company.scale}</label>
                 : <label style={{ color:'#999' }}>未收录</label>
               }
              </span>
            </li>
            <li>
              <span>
                {
                  company.location&&singleLineString`
                  ${company.location.country ? company.location.country : ''}
                  ${company.location.province ? `-${company.location.province}` : ''}
                  ${company.location.city ? `-${company.location.city}` : ''}
                  `
                }
              </span>
            </li>
            <li>
              <span>
              注册资本：
               {
                  company.registered_capital
                  ? `${transformAmount(company.registered_capital)}${company.registered_currency}`
                  : <label style={{ color:'#999' }}>未收录</label>
               }
              </span>
            </li>
            <li>
              <span>
                {
                   company.founded_date
                   ? <label>{`成立于${moment(company.founded_date).format('YYYY.MM')}`}</label>
                   : <label style={{ color:'#999' }}>未收录成立时间</label>
                 }
              </span>
            </li>
            <li>
              <span>
                法定代表人：
               {
                  company.legal_representative
                  ? company.legal_representative
                  : <label style={{ color:'#999' }}>未收录</label>
               }
              </span>
            </li>
          </ul>
          <div className='info-meta-tag'>
            { company.tags &&
              company.tags.map((tag, index) => {
                return tag.children && tag.children.map((sub_tag, sub_index) => {
                  return <span key={sub_index}>{sub_tag.name}</span>
                })
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {
  company:PropTypes.object.isRequired
}

export default Profile
