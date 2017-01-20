import React, { PropTypes, Component } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import styles from './styles'
import StorySummary from '../StorySummary'
import StoryMainLink from '../StoryMainLink'
import StoryMetadata from '../StoryMetadata'

import { COLORLESS } from '../../constants/TouchUnderlayColors'

class Story extends Component {
  constructor (props) {
    super(props)
    this.getViewPosition = this.getViewPosition.bind(this)
    this.pressExpandButton = this.pressExpandButton.bind(this)
    this.state = {
      storyPosition: 0,
      isSummaryExpanded: false
    }
  }

  componentWillUpdate (nextProps, nextState) {
    const summaryExpandedWillChange = nextState.isSummaryExpanded !== this.state.isSummaryExpanded
    const nextSummaryNotExpanded = !nextState.isSummaryExpanded
    if (summaryExpandedWillChange && nextSummaryNotExpanded) {
      this.props.scrollToY(this.state.storyPosition)
    }
  }

  render () {
    const { story, openLink, openStoryLinks } = this.props
    return (
      <View
        ref={story.id}
        style={{ opacity: this.props.visited ? 0.4 : 1 }}
        onLayout={this.getViewPosition}
      >
        <View
          shadowOpacity={0.1}
          shadowColor={'rgba(0, 0, 0, .6)'}
          shadowOffset={{width: 0, height: 2}}
          style={[styles.card, this.storySpacing()]}
        >
          <StoryMainLink
            onPress={openLink}
            mainLink={this.mainLink}
            mainCategory={this.mainCategory}
            isSceneHome={this.props.isSceneHome}
          />
          {this.renderSummary(story.headline, story.summary)}
          <StoryMetadata story={story} onPublishersPress={openStoryLinks} />
        </View>

      </View>
    )
  }

  getViewPosition () {
    const storyTopHeight = 40
    this.refs[this.props.story.id].measure((ox, oy) => {
      this.setState({storyPosition: oy - storyTopHeight})
    })
  }

  renderSummary (headline, summary) {
    if (!summary) return
    return (
      <StorySummary
        summary={summary}
        headline={headline}
        isExpanded={this.state.isSummaryExpanded}
        pressExpandButton={this.pressExpandButton}
      />
    )
  }

  pressExpandButton () {
    this.setState({isSummaryExpanded: !this.state.isSummaryExpanded})
  }

  storySpacing () {
    const { isSceneHome } = this.props

    if (isSceneHome) {
      return {
        marginTop: 16,
        marginBottom: 16
      }
    }
  }

  get mainLink () {
    return this.props.story.main_link
  }

  get mainCategory () {
    return this.props.story.main_category
  }
}

Story.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.string,
    main_link: PropTypes.shape({
      image_source_url: PropTypes.string,
      publisher: PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon_id: PropTypes.string
      }).isRequired
    }).isRequired,
    other_links: PropTypes.array.isRequired,
    main_category: PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string
    }).isRequired
  }).isRequired,
  openLink: PropTypes.func.isRequired,
  openCategory: PropTypes.func.isRequired,
  openStoryLinks: PropTypes.func.isRequired,
  visited: PropTypes.bool.isRequired,
  isSceneHome: PropTypes.bool.isRequired,
  scrollToY: PropTypes.func.isRequired
}

export default Story
