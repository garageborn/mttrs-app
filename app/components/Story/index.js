/* eslint-disable no-return-assign */
import React, { PropTypes, Component } from 'react'
import { View, findNodeHandle } from 'react-native'
import StorySummary from '../StorySummary'
import StoryMainLink from '../StoryMainLink'
import StoryMetadata from '../StoryMetadata'
import styles from './styles'

class Story extends Component {
  constructor (props) {
    super(props)
    this.measureView = this.measureView.bind(this)
    this.pressExpandButton = this.pressExpandButton.bind(this)
    this.ref = this.ref.bind(this)
    this.state = {
      storyPosition: null,
      isSummaryExpanded: false
    }
  }

  ref (component) {
    return this.view = component
  }

  render () {
    const { openLink, openStoryLinks, story, visited } = this.props
    if (!story) return null
    return (
      <View
        ref={this.ref}
        collapsable={false}
      >
        <View style={styles.card}>
          <StoryMainLink
            visited={visited}
            onPress={openLink}
            mainLink={this.mainLink}
            category={story.category}
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
    if (this.state.isSummaryExpanded) {
      this.handleScroll()
    } else {
      this.measureView()
    }

    this.setState({ isSummaryExpanded: !this.state.isSummaryExpanded })
  }

  handleScroll () {
    return this.props.scrollToY(this.state.storyPosition)
  }

  measureView () {
    if (!this.props.timelineRef) return
    this.view.measureLayout(
      findNodeHandle(this.props.timelineRef),
      (x, y, width, height) => {
        this.setState({ storyPosition: y })
      })
  }

  get mainLink () {
    return this.props.story.main_link
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
    category: PropTypes.shape({
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
