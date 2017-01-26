import React, { Component, PropTypes } from 'react'
import { Image } from 'react-native'
import * as cloudinary from '../../common/utils/Cloudinary'
import styles from './styles'

class StoryImage extends Component {
  constructor () {
    super()
    this.handleImageLoad = this.handleImageLoad.bind(this)
    this.state = {
      imageLoaded: false
    }
  }

  getImage () {
    if (!this.props.source) return
    let options = { type: 'fetch', width: 240, height: 180, crop: 'fit', secure: true }
    if (this.state.imageLoaded) {
      return {uri: cloudinary.url(this.props.source, options)}
    } else {
      return require('../../assets/mttrs-loading.gif')
    }
  }

  handleImageLoad () {
    this.setState({imageLoaded: true})
  }

  render () {
    return (
      <Image
        style={styles.image}
        onLoad={this.handleImageLoad}
        resizeMode='cover'
        source={this.getImage()}
      />
    )
  }
}

StoryImage.propTypes = {
  source: PropTypes.string
}

export default StoryImage
