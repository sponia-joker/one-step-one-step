import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Pagination.scss'
import createFragment from 'react-addons-create-fragment'
import PageView from './PageView'

function noop (pageSize) {

}

class Pagination extends Component {
  static propTypes = {
    // onChange:PropTypes.func,
    // total:PropTypes.number,
    // pageSize:PropTypes.number,
    current:PropTypes.number
  };
  static defaultProps ={
    pageSize:10,
    onChange:noop,
    current:1,
    total:1
  }
  constructor (props) {
    super(props)
    this.state = {
      selected: props.current ? props.current : 1
    }
  }
  sortKey = (keyA, keyB) => {
    const numberA = parseInt(keyA.substring(keyA.indexOf('key') + 3))
    const numberB = parseInt(keyB.substring(keyB.indexOf('key') + 3))
    return numberA - numberB
  }
  createPagination = ({ total, pageSize, current, onChange }) => {
    let items = {}
    let itemsSort = {}
    let pageNumber = total % pageSize === 0 ? total / pageSize : total / pageSize + 1
    pageNumber = parseInt(pageNumber)
    if (pageNumber <= 1) {
      return itemsSort
    }
    if (current > 1) {
      // key0,用来保持上一页总是在最前面显示
      items['key0'] = <PageView
        onClick={() => onChange(current - 1)}
        selected={false}
        title={'上一页'} />
    }
    if (pageNumber <= 5) {
      for (let index = 1; index <= pageNumber; index++) {
        items[`key${index}`] = <PageView
          onClick={() => onChange(index)}
          selected={false}
          title={`${index}`} />
      }
    } else {
      for (let index = 1, total = 0; total < 4 && total < pageNumber && index < 1000; index++) {
        if (current - index > 0) {
          items[`key${current - index}`] = <PageView
            onClick={() => onChange(current - index)}
            selected={false}
            title={`${current - index}`} />
          total++
        }
        if (total < 4 && current + index <= pageNumber) {
          items[`key${current + index}`] = <PageView
            onClick={() => onChange(current + index)}
            selected={false}
            title={`${current + index}`} />
          total++
        }
      }
    }
    items[`key${current}`] = <PageView
      onClick={() => onChange(current)}
      selected
      title={`${current}`} />
    Object.keys(items) && Object.keys(items).sort(this.sortKey).map(key => {
      itemsSort[key] = items[key]
    })
    if (current < pageNumber) {
       // `key${pageNumber+1}`保持在最后第二项显示
      itemsSort[`key${pageNumber + 1}`] = <PageView
        onClick={() => onChange(current + 1)}
        selected={false}
        title={'下一页'} />
      itemsSort[`key${pageNumber + 2}`] = <PageView
        onClick={() => onChange(pageNumber)}
        selected={false}
        title={'尾页'} />
    }
    return itemsSort
  }
  componentWillReceiveProps (nextProps) {
    this.setState({ selected:nextProps.current })
  }
  render () {
    return (
      <div className='pagination-container'>
        {
          createFragment(this.createPagination(this.props))
        }
      </div>
    )
  }
}

export default Pagination
