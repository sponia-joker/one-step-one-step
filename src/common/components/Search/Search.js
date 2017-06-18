import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import './Search.scss'

class Search extends Component {

  static propTypes = {
    location: PropTypes.object,
    router:PropTypes.object
  };

  constructor (props) {
    super(props)
    this.state = {
      value:''
    }
  }

  submitForm =() => {
    const { location, router } = this.props
    if (location.pathname !== '/search') {
      router.replace(`/search?type=company${this.state.value ? `&q=${this.state.value}` : ''}`)
    }
  }
  onKeyUp = (event) => {
    if (event.keyCode === 13) {
      this.submitForm()
    }
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  render () {
    return (
      <form className='search-form' onSubmit={false}>
        <input
          value={this.state.value || ''}
          onChange={this.handleChange}
          type='text'
          placeholder='输入公司、人名'
          className='search-form-input'
          onKeyUp={this.onKeyUp}
            />
        <input type='text' style={{ display:'none' }} />
        <span className='search-form-submit'>
          <input type='button' value='' onClick={this.submitForm} />
        </span>
      </form>

    )
  }
}
export default withRouter(Search)
