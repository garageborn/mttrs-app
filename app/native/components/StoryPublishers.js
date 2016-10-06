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
          <Image style={styles.publisherLogo} source={require('../assets/nyt.png')} />
          { this.renderCounter() }
        </View>
      </TouchableHighlight>
    )
  }

  renderCounter() {
    const { other_links } = this.props.story
    if (other_links.length <= 1) return
    return <Text style={styles.publisherTitle}>+{other_links.length - 1}</Text>
  }
}

StoryPublishers.propTypes = {
  story: PropTypes.shape({
    main_link: PropTypes.object.isRequired,
    other_links: PropTypes.array.isRequired,
  }).isRequired,
  openStoryLinks: PropTypes.func.isRequired
}

export default StoryPublishers
