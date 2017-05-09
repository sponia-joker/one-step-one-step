import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const Nav = () => (
  <div className="nav">
    <nav>
      <ul>
        {[
          { route: '/home', label: 'Home' },
          { route: '/404', label: '404 Demo' },
        ].map(link => (
          <li key={link.route}>
            <NavLink to={link.route} activeStyle={{ color: 'limegreen' }} exact>{link.label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </div>
)
export default Nav
