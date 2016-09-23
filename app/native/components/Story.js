import React, { PropTypes, Component } from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styles from '../styles/Story'
import StoryPublishers from './StoryPublishers'
import * as cloudinary from '../../common/utils/Cloudinary'

class Story extends Component {
  render() {
    const { story, openStory, openStoryLinks } = this.props
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.category}>
            <Image style={styles.categoryIcon} source={require('../assets/business.png')} />
            <Text style={styles.categoryTitle}>Category</Text>
          </View>
          <StoryPublishers story={story} openStoryLinks={openStoryLinks}/>
        </View>
        <TouchableHighlight onPress={e => openStory(story)} activeOpacity={0.7} underlayColor='white'>
          <View style={styles.cover}>
            <Image style={styles.coverImage} resizeMode='cover' source={{uri: this.getImage()}}>
              <LinearGradient style={styles.coverOverlay} colors={['transparent', 'rgba(0, 0, 0, .6)']}>
                <Text style={styles.title} numberOfLines={3}>{story.title}</Text>
              </LinearGradient>
            </Image>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  getImage() {
    const { story } = this.props

    if (!story.image_source_url) return
    let options = { type: 'fetch', width: 350, height: 255, crop: 'fit', secure: true }

    return cloudinary.url(story.image_source_url, options)
  }
}

Story.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  openStory: PropTypes.func.isRequired,
  openStoryLinks: PropTypes.func.isRequired
}

export default Story
