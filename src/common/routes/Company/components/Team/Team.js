import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Card from 'common/components/Card'
import NoRecord from 'common/components/NoRecord'
import { Link } from 'react-router-dom'
import img_default_people from 'assets/img-default-people@2x.png'

export const Team = ({ title, data }) => (
  <div className='company-team'>
    <Card title={title}>
      {
        data && data.length >= 1
        ? <div className='company-team-list'>
          {
            data.map((personal, index) => {
              return (
                <div className='company-team-list-item' key={index}>
                  <Link to={`/people/${personal.id}`}>
                    <div className='item-img'>
                      <img src={personal.avatar ? personal.avatar : img_default_people}
                        alt={personal.name} width='60px' height='60px' />
                    </div>
                  </Link>
                  <div className='item-info'>
                    <span>
                      <Link to={`/people/${personal.id}`}>
                        {personal.name}
                      </Link>
                      <label>{personal.position}</label>
                    </span>
                    <p>{personal.description}</p>
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
Team.propTypes = {
  title:PropTypes.string,
  data:PropTypes.array
}

export default Team
