import React, { Component, PropTypes } from 'react'
import { View, Image } from 'react-native'
import styles from '../styles/PublisherLogo'

class PublisherLogo extends Component {
  get logoContainerStyles() {
    const { skin, size } = this.props

    if (skin === 'light') {
      return styles.lightLogoContainerSkin
    } else {
      return styles.darkLogoContainerSkin
    }
  }

  get logoStyles() {
    const { skin, size } = this.props

    if (skin === 'light') {
      return styles.lightLogoSkin
    }
  }

  publisherLogoSize(size) {
    return {
      width: size,
      height: size,
      borderRadius: size / 2
    }
  }

  render() {
    const { source } = this.props

    return (
      <View style={[styles.logoContainer, this.logoContainerStyles]}>
        <Image style={[styles.logo, this.logoStyles]} source={source} />
      </View>
    )
  }
}

PublisherLogo.propTypes = {
  source: PropTypes.any.isRequired,
  skin: PropTypes.string.isRequired,
  size: PropTypes.number
}

export default PublisherLogo
