import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PageView extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    selected:PropTypes.bool,
    title:PropTypes.string
  };
  render () {
    const { onClick, selected, title } = this.props
    return (
      <span onClick={onClick} className={selected ? 'active' : ''}>
        {title}
      </span>
    )
  }
}

export default PageView
