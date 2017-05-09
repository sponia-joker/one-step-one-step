import React from 'react'
// import './Button.scss'

const Button = ({ style, value }) => (
  <button
    className="custom-button"
    style={style}
  >
    {value}
  </button>
)

export default Button
