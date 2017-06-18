import React from 'react'
import PropTypes from 'prop-types'

export const Image = ({ width, height, url }) => {
  let style = {}
  if (width > height && width >= 720) {
    style = { width:'720px', height:'auto' }
  }
  if (width > height && width < 720) {
    style = { width:'auto', height:'auto' }
  }
  if (width <= height && height >= 300) {
    style = { width:'auto', height:'300px' }
  }
  if (width <= height && height < 300) {
    style = { width:'auto', height:'auto' }
  }
  return (
    <img src={url}
      alt=''
      className='resp-img'
      style={style} />
  )
}

Image.propTypes = {
  width:PropTypes.number,
  height:PropTypes.number,
  url:PropTypes.string
}

export default Image
