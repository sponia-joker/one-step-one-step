import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

const Button = ({ style, value }) => (
  <button
    className="custom-button"
    style={style}
  >
    {value}
  </button>
)

Button.propTypes = {
  value:PropTypes.string.isRequired
}

export default Button
