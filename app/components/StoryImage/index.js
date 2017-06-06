import React, { Component, PropTypes } from 'react'
import { Image, Platform, PixelRatio } from 'react-native'
import * as cloudinary from '../../common/utils/Cloudinary'
import Placeholder from './components/Placeholder'
import styles from './styles'

const loading = require('../../assets/mttrs-loading.gif')
const staticLoading = require('../../assets/mttrs-loading-static.png')

class StoryImage extends Component {
  constructor (props) {
    super(props)
    this.handleImageLoad = this.handleImageLoad.bind(this)
    this.handleImageError = this.handleImageError.bind(this)
    this.state = {
      status: props.source ? 'loading' : 'error'
    }
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
    if (this.state.status === 'error') return <Placeholder story={this.props.story} />
    return (
      <Image
        style={this.styles}
        onLoad={this.handleImageLoad}
        onError={this.handleImageError}
        resizeMode='cover'
        source={this.getSource()}
      />
    )
  }

  get styles () {
    if (!this.props.visited) return styles.image
    return [styles.image, styles.visited]
  }

  getImage () {
    let options = {
      crop: 'fit',
      height: 95,
      type: 'fetch',
      width: 120
    }
    return { uri: cloudinary.url(this.props.source, options) }
  }

  getLoading () {
    return Platform.select({ ios: loading, android: staticLoading })
  }
}

StoryImage.propTypes = {
  visited: PropTypes.bool.isRequired,
  source: PropTypes.string,
  story: PropTypes.shape({
    id: PropTypes.any.isRequired
  }).isRequired
}

export default StoryImage
