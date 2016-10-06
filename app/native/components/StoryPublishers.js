import React, { Component, PropTypes } from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import styles from '../styles/Story'

class StoryPublishers extends Component {
  render() {
    const { openStoryLinks } = this.props

    return (
      <TouchableHighlight onPress={openStoryLinks}>
        <View style={styles.publisher}>
          <Image style={styles.publisherLogo} source={require('../assets/nyt.png')} />
          { this.renderCounter() }
        </View>
      </TouchableHighlight>
    )
  }

  renderCounter() {
    if (this.otherLinks.length === 0) return
    return <Text style={styles.publisherTitle}>+{this.otherLinks.length}</Text>
  }

  get mainLink() {
    return this.props.story.main_link
  }

  get otherLinks() {
    return this.props.story.other_links
  }
}

StoryPublishers.propTypes = {
  story: PropTypes.object.isRequired,
  openStoryLinks: PropTypes.func.isRequired
}

export default StoryPublishers
