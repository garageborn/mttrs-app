import React, { Component } from 'react'
import {
  Image,
  Text,
  TouchableHighlight,
  PropTypes,
  View
} from 'react-native'
import styles from '../styles/app'

class Story extends Component {
  render() {
    const {story, onClick} = this.props
    return (
      <TouchableHighlight activeOpacity={0.7} underlayColor='white' onPress={onClick.bind(this, story)}>
        <View style={styles.story}>
          <Image source={{uri: story.image.thumb}} style={styles.storyThumb} />
          <View style={styles.storyTitleContainer}>
            <Text numberOfLines={3}>{story.title}</Text>
            <Text style={styles.storyInfo}>@4AM <Text style={styles.storyInfoFrom}>from</Text> {story.publisher.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

Story.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

export default Story
