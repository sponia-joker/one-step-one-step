import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Breadcrumb.scss'

export const Breadcrumb = ({ path, style }) => (
  <div className='bread-crumb' style={style}>
    {
        path && path.map((entry, index) => {
          return <Link to={entry.link} key={index}>{`${entry.name}`}
            &nbsp;&nbsp;{
              index !== (path.length - 1) ? <span>/</span> : null
            }
          </Link>
        })
      }
  </div>
)
Breadcrumb.propTypes = {
  path:PropTypes.array,
  style:PropTypes.object
}

export default Breadcrumb
