import React, { Component, PropTypes } from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import styles from '../styles/Story'
import PublisherLogo from './PublisherLogo'
import { WHITE_COLOR } from '../../constants/TouchUnderlayColors'

class StoryPublishers extends Component {
  render() {
    const { openStoryLinks } = this.props

    return (
      <TouchableHighlight onPress={openStoryLinks} underlayColor={WHITE_COLOR}>
        <View style={styles.publisher}>
          <Text style={styles.lightText}>From </Text>
          <PublisherLogo source={require('../assets/icons/icon-publisher-mock.png')} />
          {this.getMainPublisher()}
          {this.getCounter()}
        </View>
      </TouchableHighlight>
    )
  }

  getMainPublisher() {
    const { main_link } = this.props.story
    return <Text style={styles.darkText}> {main_link.publisher.name}</Text>
  }

  getCounter() {
    const { other_links } = this.props.story
    let linksLength = other_links.length

    if (!linksLength) return

    return (
      <Text style={styles.lightText}> and
        <Text style={styles.darkText}> {linksLength} {linksLength === 1 ? 'other' : 'others'}</Text>
      </Text>
    )
  }
}

StoryPublishers.propTypes = {
  story: PropTypes.object.isRequired,
  openStoryLinks: PropTypes.func.isRequired
}

export default StoryPublishers
