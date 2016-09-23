import React, { Component, PropTypes } from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import styles from '../styles/Story'

class StoryPublishers extends Component {
  render() {
    const { story, openStoryLinks } = this.props
    const { links } = story
    if (!links) return

    if (links.length === 1) {
      return (
        <View style={styles.publisher}>
          <Image style={styles.publisherLogo} source={require('../assets/nyt.png')} />
        </View>
      )
    }

    return (
      <TouchableHighlight onPress={e => openStoryLinks(story)}>
        <View style={styles.publisher}>
          <Image style={styles.publisherLogo} source={require('../assets/nyt.png')} />
          <Text style={styles.publisherTitle}>+{links.length - 1}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

StoryPublishers.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  openStoryLinks: PropTypes.func.isRequired
}

export default StoryPublishers
