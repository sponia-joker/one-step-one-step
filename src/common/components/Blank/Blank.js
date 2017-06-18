import React from 'react'
import PropTypes from 'prop-types'
import './Blank.scss'

export const Blank = ({ over }) => {
  return (
    <div>{
        over ? <div className='blank-content'>
          <h3>抱歉，没有相关的结果</h3>
          <h4>建议你更换筛选条件后再次尝试。</h4>
        </div> : null
      }
    </div>
  )
}

Blank.propTypes = {
  over:PropTypes.bool.isRequired
}

export default Blank
