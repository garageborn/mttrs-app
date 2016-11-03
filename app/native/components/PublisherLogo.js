import React, { Component, PropTypes } from 'react'
import { View, Image } from 'react-native'
import styles from '../styles/PublisherLogo'

class PublisherLogo extends Component {
  get logoContainerStyles() {
    const { skin, size } = this.props
    let offset = 2
    let styleArr = [styles.logoContainer, this.getSize(size + offset)]

    if (skin === 'dark') {
      styleArr.push(styles.darkLogoContainerSkin)
    }

    return styleArr
  }

  get logoStyles() {
    const { skin, size } = this.props
    let styleArr = [styles.logo, this.getSize(size)]

    if (skin === 'dark') {
      styleArr.push(styles.darkLogoSkin)
    }

    return styleArr
  }

  getSize(size) {
    return {
      width: size,
      height: size,
      borderRadius: size / 2
    }
  }

  render() {
    const { source } = this.props

    return (
      <View style={this.logoContainerStyles}>
        <Image style={this.logoStyles} source={source} />
      </View>
    )
  }
}

PublisherLogo.propTypes = {
  source: PropTypes.any,
  skin: PropTypes.string,
  size: PropTypes.number
}

PublisherLogo.defaultProps = {
  size: 22
}

export default PublisherLogo
