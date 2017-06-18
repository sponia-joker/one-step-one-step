import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Select.scss'

class Select extends Component {

  static defaultProps={
    limit:10 // 默认选择数量的限制
  }
  static propTypes={
    limit:PropTypes.number,
    data:PropTypes.array,
    onChange:PropTypes.func,
    title:PropTypes.string,
    text:PropTypes.string,
    style:PropTypes.object,
    field:PropTypes.string.isRequired,
    selectId:PropTypes.string,
    selectWidth:PropTypes.number
  }

  static defaultProps = {
    selectWidth:270
  }

  constructor (props) {
    super(props)
    this.state = {
      visbile:false,
      selectArray:[],
      options:[],
      initial:true
    }
  }
  onMouseEnter = () => {
    const selectContent = this.refs.selectContent
    selectContent.style.display = 'block'
  }
  onMouseLeave = () => {
    const selectContent = this.refs.selectContent
    selectContent.style.display = 'none'
  }
  selectStyle = (element) => {
    element.style.borderRadius = '4px'
    element.style.background = '#F3F6FF'
    element.style.color = '#5a76cd'
  }
  unselectStyle = (element) => {
    if (element.parentNode.nodeName === 'TH') {
      element.style.color = '#333'
    } else {
      element.style.color = '#666'
    }
    element.style.borderRadius = '0px'
    element.style.background = '#FFFFFF'
  }
  handleSelect = (select) => {
    const index = select.dataValue
    const actualElement = document.getElementById(`${this.props.field}${index}`)
    this.unselectStyle(actualElement)
    const atr = document.createAttribute('data-select')
    atr.nodeValue = false
    actualElement.setAttributeNode(atr)
  }
  onClick = (event) => {
    const target = event.target
    const { limit, onChange, field } = this.props
    if (target.nodeName !== 'I') {
      if (target.getAttributeNode('data-id')) {
        if (target.getAttributeNode('data-select').value === 'false') {
          // 表示选中行为

          let left = this.state.selectArray
          if (this.state.selectArray.length < limit) {
            this.selectStyle(target)
            const atr = document.createAttribute('data-select')
            atr.nodeValue = true
            target.setAttributeNode(atr)
            if (target.getAttributeNode('data-parent-id').value === '0000') {
              const dataId = target.getAttributeNode('data-id').value
              const array = this.state.selectArray.filter(select => select.dataParentId === dataId)
              array && array.map(select => this.handleSelect(select))
              left = this.state.selectArray.filter(select => select.dataParentId !== dataId)
            }
            if (target.getAttributeNode('data-parent-id').value !== '0000') {
              const dataParentId = target.getAttributeNode('data-parent-id').value
              const array = this.state.selectArray.filter(select => select.dataId === dataParentId)
              array && array.map(select => this.handleSelect(select))
              left = this.state.selectArray.filter(select => select.dataId !== dataParentId)
            }
            this.setState({
              selectArray:left.concat({
                dataId:target.getAttributeNode('data-id').value,
                dataParentId :target.getAttributeNode('data-parent-id').value,
                dataValue:target.getAttributeNode('data-value').value,
                dataName:target.getAttributeNode('data-name').value,
                dataLabel:target.getAttributeNode('data-label').value
              })
            }, () => onChange({ [field]:this.state.selectArray }))
          }
        } else {
           // 取消选中行为
          const atr = document.createAttribute('data-select')
          atr.nodeValue = false
          target.setAttributeNode(atr)
          const dataId = target.getAttributeNode('data-id').value
          this.setState({
            selectArray:this.state.selectArray.filter(select => select.dataId !== dataId)
          }, () => onChange({ [field]:this.state.selectArray }))
          this.unselectStyle(target)
        }
      }
    } else {
      const targetParent = target.parentNode
      const dataId = targetParent.getAttributeNode('data-id').value
      this.setState({ selectArray:this.state.selectArray.filter(select => select.dataId !== dataId) },
          () => onChange({ [field]:this.state.selectArray }))
      const element = this.state.selectArray.filter(select => select.dataId === dataId)
      this.handleSelect(element[0])
    }
  }
  createElement = (select, index, selectId) => {
    const style = {
      borderRadius :'4px',
      background : '#F3F6FF',
      color :'#5a76cd'
    }

    const element = <span data-id={`${index}`}
      data-parent-id={'0000'}
      data-value={select.value}
      data-name={select.name}
      data-label={select.label}
      data-select={`${selectId}` === `${select.value}`}
      key={index}
      id={`${this.props.field}${select.value}`}
      style={`${selectId}` === `${select.value}` ? style : null}>{select.label}
      <i />
    </span>

    if (`${selectId}` === `${select.value}` && this.state.initial) {
      this.setState({
        selectArray:this.state.selectArray.concat({
          dataId:`${index}`,
          dataParentId :'0000',
          dataValue:select.value,
          dataName:select.name,
          dataLabel:select.label
        })
      }, () => this.props.onChange({ [this.props.field]:this.state.selectArray }))
    }
    return element
  }
  createChildrenElement = (subSelect, subIndex, index, selectId) => {
    const style = {
      borderRadius :'4px',
      background : '#F3F6FF',
      color :'#5a76cd'
    }
    const element = <span data-id={`${index}${subIndex}`}
      data-parent-id={`${index}`}
      data-value={subSelect.value}
      data-name={subSelect.name}
      data-label={subSelect.label}
      data-select={`${selectId}` === `${subSelect.value}`}
      key={subIndex}
      id={`${this.props.field}${subSelect.value}`}
      style={`${selectId}` === `${subSelect.value}` ? style : null}>
      {subSelect.label}
    </span>
    if (`${selectId}` === `${subSelect.value}` && this.state.initial) {
      this.setState({
        selectArray:this.state.selectArray.concat({
          dataId:`${index}${subIndex}`,
          dataParentId :`${index}`,
          dataValue:subSelect.value,
          dataName:subSelect.name,
          dataLabel:subSelect.label })
      }, () => this.props.onChange({ [this.props.field]:this.state.selectArray }))
    }
    return element
  }
  componentWillReceiveProps (nextProps) {
    const { data, selectId } = nextProps
    const options = data && data.map((select, index) => {
      return <tr key={index}>
        {
          select.value
          ? <th>
            {
            this.createElement(select, index, selectId)
          }
          </th> : null
        }
        <td>
          {
            select.children && select.children.map((subSelect, subIndex) => {
              return this.createChildrenElement(subSelect, subIndex, index, selectId)
            })
          }
        </td>
      </tr>
    })
    this.setState({ options, initial:false })
  }
  titleClick = () => {
    const selectContent = this.refs.selectContent
    if (selectContent.style.display === 'block') {
      selectContent.style.display = 'none'
    } else {
      selectContent.style.display = 'block'
    }
  }
  render () {
    const { limit, selectWidth } = this.props
    return (
      <div className='select-container'
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{ width:`${selectWidth}px` }}
        >
        <div className='select-title'onClick={this.titleClick}>{this.props.title}</div>
        <div className='select-text' onClick={this.titleClick}
          style={{ color:this.state.selectArray.length >= 1 ? '#333' : '#999' }}>
          {
                this.state.selectArray.length >= 1
                ? this.state.selectArray.map(select => `${select.dataLabel},`) : this.props.text
              }
        </div>
        {
          <div className='select-content'
            onClick={this.onClick}
            style={{ ...this.props.style, display:'none' }}
            ref='selectContent' >
            {
                    this.state.selectArray.length > 0
                    ? <div className='select-choiced'>
                      {
                      this.state.selectArray.map((select, index) => {
                        return <span key={index}>
                          {select.dataLabel}
                          <a href='javascript:;' data-id={select.dataId}>&nbsp;&nbsp;<i /></a>
                        </span>
                      })
                    }
                      {
                      this.state.selectArray.length >= limit ? <p>{`最多可选择${limit}个${this.props.title}`}</p> : null
                    }
                    </div> : null
                  }
            <div className='select-option' >
              <table>
                <tbody id='industries'>
                  {
                      this.state.options
                        }
                </tbody>
              </table>
            </div>
          </div>
              }
      </div>

    )
  }
}

export default Select
