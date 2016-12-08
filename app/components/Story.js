import React, { PropTypes, Component } from 'react'
import { Image, Text, TouchableHighlight, View, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styles from '../styles/Story'
import StoryPublishers from './StoryPublishers'
import StorySummary from './StorySummary'
import * as cloudinary from '../common/utils/Cloudinary'
import SocialCount from '../common/utils/SocialCount'
import { WHITE_COLOR, COLORLESS } from '../constants/TouchUnderlayColors'

class Story extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageLoaded: false,
      storyPosition: 0,
      isSummaryExpanded: false
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const summaryExpandedWillChange = nextState.isSummaryExpanded !== this.state.isSummaryExpanded
    const nextSummaryNotExpanded = !nextState.isSummaryExpanded
    if (summaryExpandedWillChange && nextSummaryNotExpanded) {
      this.props.scrollToY(this.state.storyPosition)
    }
  }

  render() {
    const { story, openLink, openStoryLinks } = this.props
    return (
      <View ref={story.id} style={{ opacity: this.props.visited ? 0.4 : 1 }} onLayout={() => this.getViewPosition()} >
        <View
          shadowOpacity={.1}
          shadowColor={'rgba(0, 0, 0, .6)'}
          shadowOffset={{width: 0, height: 2}}
          style={[styles.card, this.storySpacing()]}>
          <TouchableHighlight onPress={openLink} activeOpacity={0.7} underlayColor={WHITE_COLOR}>
            <View style={styles.content}>
              <Image style={styles.image} onLoad={() => this.handleImageLoad()} resizeMode='cover' source={this.getImage()} />
              <View style={styles.storyTitle}>
                <Text style={styles.title} numberOfLines={3}>{this.mainLink.title}</Text>
              </View>
            </View>
          </TouchableHighlight>
          {this.renderSummary(story.headline, story.summary)}
          <View style={styles.footer}>
            <StoryPublishers story={story} openStoryLinks={openStoryLinks}/>
            <View style={styles.shares}>
              <Image style={styles.shareIcon} source={require('../assets/icons/icon-hot.png')} />
              <Text style={styles.shareCount}>{SocialCount(story.total_social)}</Text>
            </View>
          </View>
        </View>
        {this.renderCategoryLabel()}
      </View>
    )
  }

  getViewPosition() {
    const storyTopHeight = 40
    this.refs[this.props.story.id].measure((ox, oy) => {
      this.setState({storyPosition: oy - storyTopHeight})
    })
  }

  renderSummary(headline, summary) {
    if (!summary) return
    return <StorySummary
      summary={summary}
      headline={headline}
      isExpanded={this.state.isSummaryExpanded}
      pressExpandButton={() => this.pressExpandButton()}
    />
  }

  pressExpandButton() {
    this.setState({isSummaryExpanded: !this.state.isSummaryExpanded})
  }

  handleImageLoad() {
    this.setState({imageLoaded: true})
  }

  storySpacing() {
    const { isSceneHome } = this.props

    if (isSceneHome) {
      return {
        marginTop: 16,
        marginBottom: 16
      }
    }
  }

  renderCategoryLabel() {
    const { isSceneHome, openCategory } = this.props

    if (isSceneHome) {
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
    if (this.state.imageLoaded) {
      return {uri: cloudinary.url(this.mainLink.image_source_url, options)}
    } else {
      return Platform.select({
        ios: require('../assets/mttrs-loading.gif'),
        android: require('../assets/mttrs-loading-static.png')
      })
    }
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
      image_source_url: PropTypes.string,
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
  visited: PropTypes.bool.isRequired,
  isSceneHome: PropTypes.bool.isRequired
}

export default Story
