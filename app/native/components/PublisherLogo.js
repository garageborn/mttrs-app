import React, { Component, PropTypes } from 'react'
import { View, Image } from 'react-native'
import styles from '../styles/PublisherLogo'

class PublisherLogo extends Component {
  render() {
    const { source } = this.props

    return (
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={source} />
      </View>
    )
  }
}

PublisherLogo.propTypes = {
  source: PropTypes.any.isRequired
}

export default PublisherLogo
