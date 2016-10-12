import React, { PropTypes, Component } from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styles from '../styles/Story'
import StoryPublishers from './StoryPublishers'
import * as cloudinary from '../../common/utils/Cloudinary'
import KFormat from '../../common/utils/KFormat'

class Story extends Component {
  render() {
    const { story, openLink, openStoryLinks } = this.props

    return (
      <View>
        <View style={styles.card} shadowOffset={{width: 0, height: 2}} shadowColor={'rgba(0, 0, 0, .6)'} shadowOpacity={.1}>
          <TouchableHighlight onPress={openLink} activeOpacity={0.7} underlayColor='white'>
            <View style={styles.content}>
              <Image style={styles.image} resizeMode='cover' source={{uri: this.getImage()}} />
              <View style={styles.storyTitle}>
                <Text style={styles.title} numberOfLines={3}>{this.mainLink.title}</Text>
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.footer}>
            <StoryPublishers story={story} openStoryLinks={openStoryLinks}/>
            <View style={styles.shares}>
              <Image style={styles.shareIcon} source={require('../assets/icons/icon-hot.png')} />
              <Text style={styles.shareCount}>{KFormat(story.total_social)}+</Text>
            </View>
          </View>
        </View>
        {this.renderCategoryLabel()}
      </View>
    )
  }

  renderCategoryLabel() {
    const { section, openCategory } = this.props

    if (typeof section === 'undefined') {
      return (
        <View style={[styles.category, {backgroundColor: this.mainCategory.color}]}>
          <TouchableHighlight onPress={openCategory}>
            <Text style={styles.categoryTitle}>{this.mainCategory.name.toUpperCase()}</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }

  getImage() {
    if (!this.mainLink.image_source_url) return
    let options = { type: 'fetch', width: 240, height: 180, crop: 'fit', secure: true }
    return cloudinary.url(this.mainLink.image_source_url, options)
  }

  get mainLink() {
    return this.props.story.main_link
  }

  get mainCategory() {
    return this.mainLink.categories[0]
  }
}

Story.propTypes = {
  story: PropTypes.object.isRequired,
  openLink: PropTypes.func.isRequired,
  openCategory: PropTypes.func.isRequired,
  openStoryLinks: PropTypes.func.isRequired
}

export default Story
