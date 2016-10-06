import React, { Component, PropTypes } from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import styles from '../styles/Story'

class StoryPublishers extends Component {
  render() {
    const { story, openStoryLinks } = this.props
    if (!story.links) return

    return (
      <TouchableHighlight onPress={openStoryLinks}>
        <View style={styles.publisher}>
          <Text style={styles.textLight}>From </Text>
          <Image style={styles.publisherLogo} source={require('../assets/icons/icon-publisher-mock.png')} />
          {this.getMainPublisher()}
          {this.getCounter()}
        </View>
      </TouchableHighlight>
    )
  }

  getMainPublisher() {
    const { main_link } = this.props.story
    return <Text style={styles.textDark}> {main_link.publisher.name}</Text>
  }

  getCounter() {
    const { other_links } = this.props.story
    let linksLength = other_links.length

    if (!linksLength) return

    return (
      <Text style={styles.textLight}> and
        <Text style={styles.textDark}> {linksLength} {linksLength === 1 ? 'other' : 'others'}</Text>
      </Text>
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
