import React, { PropTypes, Component } from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styles from '../styles/Story'
import StoryPublishers from './StoryPublishers'
import * as cloudinary from '../../common/utils/Cloudinary'
import KFormat from '../../common/utils/KFormat'
import { WHITE_COLOR, COLORLESS } from '../../constants/TouchUnderlayColors'

class Story extends Component {
  render() {
    const { story, openLink, openStoryLinks } = this.props
    return (
      <View style={{ opacity: this.props.visited ? 0.4 : 1 }}>
        <View
          shadowOpacity={.1}
          shadowColor={'rgba(0, 0, 0, .6)'}
          shadowOffset={{width: 0, height: 2}}
          style={[styles.card, this.storySpacing()]}>
          <TouchableHighlight onPress={openLink} activeOpacity={0.7} underlayColor={WHITE_COLOR}>
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

  storySpacing() {
    const { section } = this.props

    if (typeof section === 'undefined' || section === null) {
      return {
        marginTop: 16,
        marginBottom: 16
      }
    }
  }

  renderCategoryLabel() {
    const { section, openCategory } = this.props

    if (typeof section === 'undefined' || section === null) {
      return (
        <TouchableHighlight
          onPress={openCategory}
          underlayColor={COLORLESS}
          style={[styles.category, {backgroundColor: this.mainCategory.color}]}>
          <Text style={styles.categoryTitle}>{this.mainCategory.name.toUpperCase()}</Text>
        </TouchableHighlight>
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
    return this.props.story.main_category
  }
}

Story.propTypes = {
  story: PropTypes.shape({
    main_link: PropTypes.shape({
      image_source_url: PropTypes.string.isRequired,
      publisher: PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon_id: PropTypes.string
      }).isRequired,
    }).isRequired,
    other_links: PropTypes.array.isRequired,
    main_category: PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string
    }).isRequired,
  }).isRequired,
  openLink: PropTypes.func.isRequired,
  openCategory: PropTypes.func.isRequired,
  openStoryLinks: PropTypes.func.isRequired,
  visited: PropTypes.bool.isRequired
}

export default Story
