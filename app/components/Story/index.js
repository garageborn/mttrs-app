import React, { PropTypes, Component } from 'react'
import { View, findNodeHandle } from 'react-native'
import styles from './styles'
import StorySummary from '../StorySummary'
import StoryMainLink from '../StoryMainLink'
import StoryMetadata from '../StoryMetadata'

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
        collapsable={false}
      >
        <View
          style={styles.card}
        >
          <StoryMainLink
            onPress={openLink}
            mainLink={this.mainLink}
            mainCategory={this.mainCategory}
            isHomeScene={this.props.isHomeScene}
          />
          {this.renderSummary(story.headline, story.summary)}
          <StoryMetadata story={story} onPublishersPress={openStoryLinks} />
        </View>

      </View>
    )
  }

  getViewPosition () {
    const storyTopHeight = 40
    if (!this.props.timelineRef) return
    this.refs[this.props.story.id].measureLayout(
      findNodeHandle(this.props.timelineRef),
      (x, y) => {
        this.setState({storyPosition: y - storyTopHeight})
      }
    )
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
    other_links_count: PropTypes.number.isRequired,
    main_category: PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string
    }).isRequired
  }).isRequired,
  openLink: PropTypes.func.isRequired,
  openStoryLinks: PropTypes.func.isRequired,
  visited: PropTypes.bool.isRequired,
  isHomeScene: PropTypes.bool.isRequired,
  scrollToY: PropTypes.func.isRequired,
  timelineRef: PropTypes.object
}

export default Story
