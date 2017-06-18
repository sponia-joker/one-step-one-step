import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Image from './Image'
import { getImgMetaWithUrl } from 'tools'

export class Resp_Image extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    style: PropTypes.object
  }
  state = {
    meta: {}
  }
  componentDidMount () {
    const { url } = this.props
    this.getImgMeta(url)
  }

  getImgMeta = (url) => {
    getImgMetaWithUrl(url).then(meta => this.setState({
      meta
    }))
  }

  componentWillReceiveProps (nextProps) {
    const { url } = nextProps
    this.getImgMeta(url)
  }

  render () {
    const { url, style } = this.props
    const { meta } = this.state
    return (
      <div className='resp-image-wrap' style={style}>
        <Image
          width={meta.width}
          height={meta.height}
          url={url}
                />
      </div>
    )
  }
}
export default Resp_Image
