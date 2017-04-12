/* eslint-disable no-return-assign */
import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import StorySummary from '../StorySummary'
import StoryMainLink from '../StoryMainLink'
import StoryMetadata from '../StoryMetadata'
import styles from './styles'

class Story extends Component {

  render () {
    const { openLink, openStoryLinks, story, visited } = this.props

    if (!story) return null

    return (
      <View
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
    if (!this.hasSummary) return null

    return (
      <StorySummary
        visited={this.props.visited}
        summary={this.props.story.summary}
        headline={this.props.story.headline}
      />
    )
  }

  get mainLink () {
    return this.props.story.main_link
  }

  get hasSummary () {
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
  visited: PropTypes.bool.isRequired
}

export default Story
