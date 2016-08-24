import React, { PropTypes, Component } from 'react'
import {
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import styles from '../styles/app'
import ComponentsJoiner from '../utils/ComponentsJoiner'
import * as cloudinary from '../../common/utils/Cloudinary'

class Story extends Component {
  render() {
    const { story } = this.props
    return (
      <TouchableHighlight activeOpacity={0.7} underlayColor='white'>
        <View style={styles.story}>
          <Image source={{uri: this.getImage()}} style={styles.storyThumb} />
          <View style={styles.storyTitleContainer}>
            <Text numberOfLines={3}>{story.title}</Text>
            <Text style={styles.storyInfo}><Text style={styles.storyInfoFrom}>From</Text> {this.getPublishers()}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  getImage () {
    const { story } = this.props

    if (!story.image_source_url) return
    let options = { type: 'fetch', width: 200, height: 200, crop: 'fit', secure: true }

    return cloudinary.url(story.image_source_url, options)
  }

  getPublishers() {
    const { links } = this.props.story

    if (!links) return

    let publishers = links.map((link, index) => {
      return link.publisher.name
    })

    return ComponentsJoiner(publishers)
  }
}

Story.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
}

export default Story
