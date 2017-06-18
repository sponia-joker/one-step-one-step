import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import company_default_logo from 'assets/img-default-company@2x.png'
import './Image.scss'

class Image extends Component {

  static propTypes = {
    defaultImg:PropTypes.string,
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    link: PropTypes.string,
    radius: PropTypes.number
  }
  static defaultProps ={
    radius:10,
    defaultImg:company_default_logo
  }
  constructor (props) {
    super(props)
    this.state = {
      loadFail:false
    }
  }

  getImgMeta = (url) => (new Promise(
        (resolve, reject) => {
          const img = document.createElement('img')
          img.src = url
          img.onload = () => resolve({
            width: img.width,
            height: img.height
          })
          img.onerror = () => reject({})
        }
    ));

  componentDidMount () {
    const { url } = this.props
    this.setImageState(url)
  }
  componentWillReceiveProps (nextProps) {
    const { url } = nextProps
    this.setImageState(url)
  }
  setImageState=(url) => {
    const that = this
    if (url) {
      this.getImgMeta(url).then(response => {
        that.setState({
          width: response.width,
          height: response.height
        })
      }).catch(error => {
        that.setState({ loadFail:true })
        throw error
      })
    }
  }
  render () {
    const { url, width, height, link, radius, defaultImg } = this.props
    const actualHeight = parseInt(this.state.height ? this.state.height : height)
    const actualWidth = parseInt(this.state.width ? this.state.width : width)
    let style = {
      width: `${width}px`,
      height: `${(actualHeight * width) / actualWidth}px`,
      position: 'absolute',
      top: `${((Math.abs(height - ((actualHeight * width) / actualWidth))) / 2)}px`,
      left: '0px'
    }
    if (actualHeight > actualWidth) {
      style = {
        height: `${height}px`,
        width: `${(actualWidth * height) / actualHeight}px`,
        position: 'absolute',
        top: '0px',
        left: `${(Math.abs((width - ((actualWidth * height) / actualHeight))) / 2)}px`
      }
    }
    return (
      <Link className='image-company-link'
        to={link}
        style={{ height:`${height}px`, width:`${width}px`, borderRadius:`${radius}px` }}>
        {
          this.state.loadFail || !url
          ? <img src={defaultImg} height={`${height}px`} width={`${width}px`} />
          : <img src={url} style={style} />
        }
      </Link>
    )
  }
}

export default Image
