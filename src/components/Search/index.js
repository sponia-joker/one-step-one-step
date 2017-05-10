import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Search.scss'
import { searchKey } from 'data/search/actions'
import { connect } from 'react-redux'

@connect(state => ({
    keys: state.search
}), {
    searchKey
})
class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }
    handleChnage = (event) => {
        this.setState({
            value: event.target.value
        })

    }
    submitForm = () => {
        const keys = ['key1', 'key2', 'key3']
        this.props.searchKey(keys)
    }
    render() {
        console.log(this.props.keys)
        return (
            <form className='search-form' onSubmit={false}>
            <input
              value={this.state.value}
              onChange={this.handleChnage}
              type='text'
              placeholder='搜索人名、公司'
              className='search-form-input'
              onKeyUp={this.onKeyUp}
                />
            <span className='search-form-submit'>
              <input type='button' value='' onClick={this.submitForm} />
            </span>
          </form>
        )
    }
}
export default Search
