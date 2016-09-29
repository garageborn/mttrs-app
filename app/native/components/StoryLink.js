import React, { Component, PropTypes } from 'react'
import { View, Image, TouchableHighlight, Text } from 'react-native'
import styles from '../styles/StoryLinks'

class StoryLink extends Component {
  render() {
    const { link, rowID, openLink } = this.props
    return (
      <View
        shadowOffset={{width: 1, height: 2}}
        shadowColor={'rgba(0, 0, 0, .1)'}
        shadowOpacity={1.0}
        style={rowID === '0' ? styles.firstRow : styles.row}>
        <View style={rowID === '0' ? styles.firstRowContainer : styles.rowContainer}>
          <View style={styles.publisher}>
            <Image style={styles.logo} source={require('../assets/publisher-placeholder.png')} />
            <View style={styles.publisherInfo}>
              <Text style={styles.title}>{link.publisher.name}</Text>
              <Text style={styles.time}>Yesterday 07:01</Text>
            </View>
          </View>
          <View style={styles.story}>
            <TouchableHighlight style={styles.rowTouch} onPress={e => openLink(link)}>
              <Text numberOfLines={2} style={styles.storyTitle}>{link.title}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

StoryLink.propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired,
  rowID: PropTypes.string.isRequired,
  openLink: PropTypes.func.isRequired
}

export default StoryLink
