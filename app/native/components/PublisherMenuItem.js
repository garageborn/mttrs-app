import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableHighlight, Image } from 'react-native'
import styles from '../styles/MenuPublishers'

class PublisherMenuItem extends Component {
  render() {
    const { onPress, publisher } = this.props
    return (
      <TouchableHighlight style={styles.touch} onPress={e => onPress(publisher)}>
        <View style={styles.publisher}>
          <Image style={styles.logo} source={require('../assets/publisher-placeholder.png')} />
          <Text style={styles.name}>{publisher.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

PublisherMenuItem.propTypes = {
  publisher: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  onPress: PropTypes.func.isRequired
}

export default PublisherMenuItem
