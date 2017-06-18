import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// import company_default_logo from 'assets/img-default-company@2x.png'
import Image from 'common/components/Image'
import stadium_default_logo from 'assets/img-default-stadium@2x.png'
import { removeMunicipality, singleLineString } from 'tools'

class Stadium extends Component {
  static propTypes = {
    data: PropTypes.object
  };
  render () {
    const stadium = this.props.data
    return (
      <li>
        <div className='logo-container logo-container-stadium'>
          <div className='logo'>
            <Image
              defaultImg={stadium_default_logo}
              height={77}
              width={100}
              url={stadium.logo}
              link={`/stadium/${stadium.id}`}
              radius={8} />
          </div>
          <div className='logo-text logo-text-stadium'>
            <a href={`/stadium/${stadium.id}`} className='company-link' target='_blank'>{stadium.name}</a>
            <p>
              {
                  stadium.address || stadium.location
                 ? singleLineString`${stadium.location.province ? stadium.location.province : ''}
                  ${stadium.location.city ? removeMunicipality(stadium.location.city) : ''}
                  ${stadium.location.district ? stadium.location.district : ''}
                  ${stadium.address ? stadium.address : ''}` : '未收录'
                }
            </p>
          </div>
        </div>
        <span style={{ width:'200px', lineHeight:'20px' }}>{
                stadium.stadium_types && stadium.stadium_types.map(type => (
                  <span key={type.id}>{type.name}</span>
          ))
        }
        </span>
        <span style={{ width:'200px', lineHeight:'20px' }} >{stadium.telephone}</span>
      </li>
    )
  }
}

export default Stadium
