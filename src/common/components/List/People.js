import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import img_default_people from 'assets/img-default-people@2x.png'

class People extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  render () {
    const people = this.props.data
    const company = people && people.company
    return (
      <li className='people-item'>
        <div className='people-logo'>

          <Link to={`/people/${people.id}`} className='people-img-link'>
            <img src={people.avatar ? people.avatar : img_default_people}
              alt={people.name} width='60px' height='60px' />
          </Link>
          <p className='people-name'>
            <Link to={`/people/${people.id}`}>{people.name}</Link>
          </p>
          <p className='people-address'>{company.short_name}</p>
        </div>
        <div className='people-description'>
          {people.description}
        </div>
      </li>
    )
  }
}

export default People
