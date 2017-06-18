import React from 'react'
import PropTypes from 'prop-types'
import './Card.scss'

export const Card = ({ children, title, subtitle }) => (
  <div className='card'>
    <div className='card-header'>
      <span>
        {title}
      </span>
      {
        subtitle && <label>{subtitle}</label>
      }
    </div>
    <div className='card-body'>
      {
        children && children instanceof Array ? children.map((element, index) => (
          <div className='card-body-item' key={index}>
            {element}
          </div>
        )) : <div className='card-body-item'>
          {children}
        </div>
      }
    </div>

  </div>
)
Card.propTypes = {
  children:PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]),
  title:PropTypes.string,
  subtitle:PropTypes.string
}

export default Card
