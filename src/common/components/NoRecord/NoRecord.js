import React from 'react'
import PropTypes from 'prop-types'
import './NoRecord.scss'

export const NoRecord = ({ style }) => {
  return (
    <div className='no-record-nothing' style={style}>未收录相关信息</div>
  )
}
NoRecord.propTypes = {
  style:PropTypes.object
}
export default NoRecord
