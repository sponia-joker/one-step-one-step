import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Card from 'common/components/Card'
import NoRecord from 'common/components/NoRecord'
import Image from 'common/components/Image'
import stadium_default_logo from 'assets/img-default-stadium@2x.png'

export const Stadiums = ({ title, data, company_id }) => (
  <div className='company-stadiums'>
    <Card title={title}>
      {
        data && data.length >= 1
        ? <div className='company-stadiums-list'>
          {
              data.map((stadium, index) => {
                return (
                  <div className='company-stadiums-list-item' key={index}>
                    <div className='item-img'>
                      <Image
                        defaultImg={stadium_default_logo}
                        height={77}
                        width={100}
                        radius={0}
                        url={stadium.logo} />
                    </div>
                    <div className='item-info'>
                      <span>
                        <a href={`/stadium/${stadium.id}`} className='stadiums-has-link'>{stadium.name}</a>
                        <a className='stadiums-type'>{
                          stadium.companies && stadium.companies.map(company => {
                            if (`${company.id}` === `${company_id}`) {
                              return company.role
                            }
                          })
                        }</a>
                      </span>
                      <p>{
                        stadium.stadium_types && stadium.stadium_types.map((type, index) => (
                            `${type.name}${index !== stadium.stadium_types.length - 1 ? '、' : ''}`
                        ))
                      }</p>
                    </div>
                  </div>
                )
              })
            }
        </div> : <NoRecord />
      }
    </Card>
  </div>
)
Stadiums.propTypes = {
  title:PropTypes.string,
  data:PropTypes.array,
  company_id:PropTypes.number
}

export default Stadiums
