import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Search.scss'

class Search extends Component {

  constructor(props) {
    super(props);
    this.state={
      value:'',
    }
  }
  handleChnage=(event)=>{
    this.setState({
      value:event.target.value
    })

  }
  render() {
    return (
      <form className='search-form' onSubmit={false}>
        <input
          onChange={this.handleChnage}
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
export default Search

