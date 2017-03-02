import React, { PropTypes, Component } from 'react'
import { View, findNodeHandle } from 'react-native'
import StorySummary from '../StorySummary'
import StoryMainLink from '../StoryMainLink'
import StoryMetadata from '../StoryMetadata'
import styles from './styles'

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
    if (!this.isExpandable) return
    const summaryExpandedWillChange = nextState.isSummaryExpanded !== this.state.isSummaryExpanded
    const nextSummaryNotExpanded = !nextState.isSummaryExpanded
    if (summaryExpandedWillChange && nextSummaryNotExpanded) {
      this.props.scrollToY(this.state.storyPosition)
    }
  }

  render () {
    const { openLink, openStoryLinks, story, visited } = this.props
    if (!story) return null
    return (
      <View
        ref={story.id}
        onLayout={this.getViewPosition}
        collapsable={false}
      >
        <View style={styles.card}>
          <StoryMainLink
            visited={visited}
            onPress={openLink}
            mainLink={this.mainLink}
            mainCategory={this.mainCategory}
            story={story}
          />
          {this.renderSummary(story.headline, story.summary)}
          <StoryMetadata
            visited={visited}
            story={story}
            onPublishersPress={openStoryLinks}
          />
        </View>
      </View>
    )
  }

  getViewPosition () {
    if (!this.isExpandable) return

    const storyTopHeight = 40
    if (!this.props.timelineRef) return
    this.refs[this.props.story.id].measureLayout(
      findNodeHandle(this.props.timelineRef),
      (x, y) => {
        this.setState({ storyPosition: y - storyTopHeight })
      }
    )
  }

  renderSummary () {
    if (!this.isExpandable) return null

    return (
      <StorySummary
        visited={this.props.visited}
        summary={this.props.story.summary}
        headline={this.props.story.headline}
        isExpanded={this.state.isSummaryExpanded}
        pressExpandButton={this.pressExpandButton}
      />
    )
  }

  pressExpandButton () {
    this.setState({ isSummaryExpanded: !this.state.isSummaryExpanded })
  }

  get mainLink () {
    return this.props.story.main_link
  }

  get mainCategory () {
    return this.props.story.main_category
  }

  get isExpandable () {
    const { headline, summary } = this.props.story
    const hasHeadline = headline && headline.length > 0
    const hasSummary = summary && summary.length > 0
    return hasHeadline && hasSummary
  }
}

Story.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.string,
    headline: PropTypes.string,
    summary: PropTypes.string,
    main_link: PropTypes.shape({
      image_source_url: PropTypes.string,
      publisher: PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon_id: PropTypes.string
      }).isRequired
    }).isRequired,
    other_links_count: PropTypes.number.isRequired,
    main_category: PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string
    })
  }).isRequired,
  openLink: PropTypes.func.isRequired,
  openStoryLinks: PropTypes.func.isRequired,
  visited: PropTypes.bool.isRequired,
  scrollToY: PropTypes.func.isRequired,
  timelineRef: PropTypes.object
}

export default Story
