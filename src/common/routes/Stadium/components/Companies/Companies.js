import React from 'react'
import PropTypes from 'prop-types'
import Card from 'common/components/Card'
import './Companies.scss'
import { Link } from 'react-router-dom'
import Image from 'common/components/Image'
import Tag from 'common/components/Tag'
import NoRecord from 'common/components/NoRecord'

const Company = ({ company }) => (
  <div className='stadium-companies-item'>
    <div className='stadium-companies-item-logo'>
      <Image
        height={60}
        width={60}
        url={company.logo}
        link={`/company/${company.id}`}
        radius={6} />
    </div>
    <div className='stadium-companies-item-text'>
      <Link to={`/company/${company.id}`}>{company.name}</Link>
      <Tag text={company.role} />
      <p>{company.description}</p>
    </div>
  </div>
)
Company.propTypes = {
  company:PropTypes.object
}

export const Companies = ({ title, data }) => (
  <div className='stadium-companies'>
    <Card title={title}>
      {
          data && data.length >= 1 ? data.map(company => (
            <Company
              key={company.id}
              company={company}
             />
          )) : <NoRecord />
      }
    </Card>
  </div>
)
Companies.propTypes = {
  title:PropTypes.string,
  data:PropTypes.array
}

export default Companies
