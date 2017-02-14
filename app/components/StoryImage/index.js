import React, { Component, PropTypes } from 'react'
import { Image, Platform } from 'react-native'
import _sample from 'lodash/sample'
import * as cloudinary from '../../common/utils/Cloudinary'
import styles from './styles'

const loading = require('../../assets/mttrs-loading.gif')
const staticLoading = require('../../assets/mttrs-loading-static.png')
const placeholders = [
  require('./assets/placeholder-01.png'),
  require('./assets/placeholder-02.png'),
  require('./assets/placeholder-03.png'),
  require('./assets/placeholder-04.png'),
  require('./assets/placeholder-05.png')
]

class StoryImage extends Component {
  constructor () {
    super()
    this.handleImageLoad = this.handleImageLoad.bind(this)
    this.handleImageError = this.handleImageError.bind(this)
    this.state = { status: 'loading' }
  }

  componentWillMount () {
    if (!this.props.source) this.setState({ status: 'error' })
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.props.source !== nextProps.source || this.state.status !== nextState.status
  }

  getSource () {
    if (this.state.status === 'loading') {
      return this.getLoading()
    } else {
      return this.getImage()
    }
  }

  handleImageLoad () {
    this.setState({ status: 'loaded' })
  }

  handleImageError () {
    this.setState({ status: 'error' })
  }

  render () {
    if (this.state.status === 'error') return this.renderPlaceholder()
    return (
      <Image
        style={styles.image}
        onLoad={this.handleImageLoad}
        onError={this.handleImageError}
        resizeMode='cover'
        source={this.getSource()}
      />
    )
  }

  renderPlaceholder () {
    return <Image style={styles.image} resizeMode='cover' source={this.getPlaceholder()} />
  }

  getImage () {
    let options = { type: 'fetch', width: 240, height: 180, crop: 'fit', secure: true }
    return { uri: cloudinary.url(this.props.source, options) }
  }

  getPlaceholder () {
    return _sample(placeholders)
  }

  getLoading () {
    return Platform.select({ ios: loading, android: staticLoading })
  }
}

StoryImage.propTypes = {
  source: PropTypes.string
}

export default StoryImage
