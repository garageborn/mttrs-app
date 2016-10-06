import React, { Component, PropTypes } from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import styles from '../styles/Story'

class StoryPublishers extends Component {
  render() {
    const { story, openStoryLinks } = this.props
    if (!story.links) return

    return (
      // <TouchableHighlight>
      //   <View style={styles.publishers}>
      //     <Text>From</Text>
      //     <Image style={styles.publisherLogo} source={require('../assets/icons/icon-publisher-mock.png')} />
      //     <Text>New York Times</Text>
      //     <Text>and 3 others</Text>
      //   </View>
      // </TouchableHighlight>
      <TouchableHighlight onPress={openStoryLinks}>
        <View style={styles.publisher}>
          <Text>From</Text>
          <Image style={styles.publisherLogo} source={require('../assets/icons/icon-publisher-mock.png')} />
          {this.getMainPublisher()}
          {this.renderCounter()}
        </View>
      </TouchableHighlight>
    )
  }

  getMainPublisher() {
    const { main_link } = this.props.story

    return <Text>{main_link.publisher.name}</Text>
  }

  getMainPublisherLogo() {

  }

  renderCounter() {
    const { links } = this.props.story
    if (links.length <= 1) return
    return <Text style={styles.publisherTitle}> and +{links.length - 1}</Text>
  }
}

StoryPublishers.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  openStoryLinks: PropTypes.func.isRequired
}

export default StoryPublishers
