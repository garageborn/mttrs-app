import React, { PropTypes, Component } from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styles from '../styles/Story'
import StoryPublishers from './StoryPublishers'
import * as cloudinary from '../../common/utils/Cloudinary'

class Story extends Component {
  render() {
    const { story, openLink, openCategory, openStoryLinks } = this.props
    return (
      <View style={styles.card} shadowOffset={{width: 0, height: 2}} shadowColor={'rgba(0, 0, 0, .6)'} shadowOpacity={.1} elevation={1}>
        <View style={styles.category}>
          <TouchableHighlight onPress={openCategory}>
            <Text style={styles.categoryTitle}>{`Entertainment`.toUpperCase()}</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight onPress={openLink} activeOpacity={0.7} underlayColor='white'>
          <View style={styles.content}>
            <Image style={styles.image} resizeMode='cover' source={{uri: this.getImage()}} />
            <View style={styles.storyTitle}>
              <Text style={styles.title} numberOfLines={3}>{story.title}</Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.footer}>
          <StoryPublishers story={story} openStoryLinks={openStoryLinks}/>
          <View style={styles.shares}>
            <Image style={styles.shareFire} source={require('../assets/icons/icon-hot.png')} />
            <Text style={styles.shareCount}>4.5k+</Text>
          </View>
        </View>
      </View>
    )
  }

  getImage() {
    const { story } = this.props

    if (!story.image_source_url) return
    let options = { type: 'fetch', width: 240, height: 180, crop: 'fit', secure: true }

    return cloudinary.url(story.image_source_url, options)
  }
}

Story.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  openLink: PropTypes.func.isRequired,
  openCategory: PropTypes.func.isRequired,
  openStoryLinks: PropTypes.func.isRequired
}

export default Story
