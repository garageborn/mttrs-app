import React, { Component, PropTypes } from 'react'
import { View, Image } from 'react-native'
import styles from '../styles/MenuPublishers'

class PublisherLogo extends Component {
  render() {
    return (
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={ {uri: this.props.source} } />
      </View>
    )
  }
}

PublisherLogo.propTypes = {
  source: PropTypes.string.isRequired
}

export default PublisherLogo
