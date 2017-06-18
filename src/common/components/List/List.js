import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Company from './Company'
import Investment from './Investment'
import People from './People'
import './List.scss'
import Blank from 'common/components/Blank'
import Stadium from './Stadium'

class List extends Component {
  static propTypes = {
    data: PropTypes.array,
    // total: PropTypes.number,
    title: PropTypes.array,
    type: PropTypes.string,
    over: PropTypes.bool
  };
  static defaultProps = {}
  render () {
    const { data, title, type, over } = this.props
    return (
      <div className='list-main'>
        {
          /*
          total ? <div className='number'>
            <span>共{total}条结果</span>
          </div> : null
          */
        }
        {
          data && data.length >= 1 && type !== 'Stadium'
          ? <ul className='list-main-header'
            style={{ textAlign:type === 'People' || type === 'Stadium' ? 'left' : 'center' }}>
            {
                  title && title.map((name, index) => {
                    if (type === 'People' && index === 0) {
                      return <li key={index} style={{ paddingLeft:'110px', width:'310px' }}>{name}</li>
                    }
                    return <li key={index}>{name}</li>
                  })
                }
          </ul> : null
        }
        {
          data && data.length >= 1 && type === 'Stadium'
           ? <ul className='list-main-header-stadium'>
             {
                    title && title.map((name, index) => {
                      return <li key={index}>{name}</li>
                    })
              }
           </ul> : null
        }
        {
          data && data.length >= 1
          ? <ul className='list-entry' id='list_entry'>
            {
              data && data.map((entry, index) => {
                return type === 'Investment'
                ? <Investment data={entry} key={index} />
                : type === 'Company' ? <Company data={entry} key={index} /> : type === 'Stadium'
                ? <Stadium data={entry} key={index} /> : <People key={index} data={entry} />
              })
            }
          </ul> : <Blank over={over} />
        }

      </div>
    )
  }
}

export default List
