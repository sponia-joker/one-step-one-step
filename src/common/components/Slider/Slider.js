import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Slider.scss'
import Resp_Image from 'common/components/Resp_Image'

export class Slider extends Component {
  state={
    display:0
  }
  static propTypes = {
    images:PropTypes.array
  }
  displayPre = () => {
    const { images } = this.props
    const size = images.length
    this.setState({ display:((this.state.display + size) - 1) % size })
  }
  displayNext = () => {
    const { images } = this.props
    const size = images.length
    this.setState({ display:(this.state.display + 1) % size })
  }
  displayCurrent=(index) => {
    this.setState({
      display:index
    })
  }
  render () {
    const { images } = this.props
    const { display } = this.state
    return (
      <div className='slider'>
        <div className='slider-image'>
          {
            images && images.length > 1 && <div className='slider-pre' onClick={this.displayPre} />
          }
          <Resp_Image url={images[display]} />
          {
            images && images.length > 1 && <div className='slider-next' onClick={this.displayNext} />
          }
        </div>
        {
          images && images.length > 1 && <div className='slider-thumbnails'>
            {
            images.map((src, index) => (
              <div
                key={index}
                className='slider-thumbnails-item'
                style={{ border:index === display ? '2px solid #5a76cd' : 0 }}>
                <img src={src} width='83px' height='46px' onClick={() => this.displayCurrent(index)} />
              </div>
            ))
          }
          </div>
        }

      </div>
    )
  }
}

export default Slider

