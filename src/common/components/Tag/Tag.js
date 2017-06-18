import React from 'react'
import PropTypes from 'prop-types'

export const Tag = ({ text }) => (
  <span className='tag' style={{
    background: '#F3F6FF',
    borderRadius: '4px',
    padding:'4px 5px',
    fontSize: '12px',
    color:'#5A76CD' }}>
    {text}
  </span>
)
Tag.propTypes = {
  text:PropTypes.string
}

export default Tag
