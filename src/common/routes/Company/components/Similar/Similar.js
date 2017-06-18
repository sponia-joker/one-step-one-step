import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Card from 'common/components/Card'
import NoRecord from 'common/components/NoRecord'
import Image from 'common/components/Image'

export const Similar = ({ title, data }) => (
  <div className='company-similar'>
    <Card title={title}>
      {
        data && data.length >= 1
        ? <div className='company-similar-list'>
          {
            data.map((company, index) => {
              return (
                <div className='similar-list-item' key={index}>
                  <div className='similar-logo' >
                    <Image
                      height={50}
                      width={50}
                      url={company.logo}
                      link={`/company/${company.id}`}
                      radius={5} />
                  </div>
                  <div className='similar-name'>
                    <a href={`/company/${company.id}`} target='_blank'>
                      {
                              company.short_name
                          }
                    </a>
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
Similar.propTypes = {
  title:PropTypes.string,
  data:PropTypes.array
}

export default Similar
