import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Header.scss'
import Search from 'common/components/Search'

export const Header = ({ style, fontColor, logo, hover, search = true }) => (
  <div className='header-wrap' style={style}>
    <div className='header'>
      <div className='header-logo'>
        <Link to='/'>
          <img src={logo} alt='' height='44px' />
        </Link>
      </div>
      <ul className={hover ? 'link-hover-color header-link' : 'header-link'}>
        <li><Link to='/' style={{ color:fontColor }}>首页</Link></li>
        <li><Link to='/companies' style={{ color:fontColor }}>体育公司</Link></li>
        <li><Link to='/stadiums' style={{ color:fontColor }}>运动场馆</Link></li>
        <li><Link to='/investments' style={{ color:fontColor }}>融资数据</Link></li>
        {
          search && <Search />
        }
      </ul>
    </div>
  </div>
)
Header.propTypes = {
  style: PropTypes.object,
  search: PropTypes.bool,
  fontColor: PropTypes.string,
  logo: PropTypes.string.isRequired,
  hover: PropTypes.bool
}
Header.defaultProps = {
  fontColor: '#333',
  hover:true
}
export default Header
