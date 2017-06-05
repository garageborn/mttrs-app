/* eslint-disable no-return-assign */
import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import SummaryContainer from '../../containers/SummaryContainer'
import StoryMainLink from '../StoryMainLink'
import StoryMetadata from '../StoryMetadata'
import styles from './styles'

class Story extends Component {
  shouldComponentUpdate (nextProps) {
    return this.props.visited !== nextProps.visited
  }

  render () {
    const { story } = this.props
    if (!story) return null

    return (
      <View style={styles.card}>
        {this.renderMainLink()}
        {this.renderSummary()}
        {this.renderMetadata()}
      </View>
    )
  }

  renderMainLink () {
    const { handleDialogButtonPress, openLink, story, visited } = this.props

    return (
      <StoryMainLink
        visited={visited}
        onPress={openLink}
        story={story}
        openDialog={handleDialogButtonPress}
      />
    )
  }

  renderSummary () {
    if (!this.hasSummary) return null

    const { story, visited } = this.props
    return <SummaryContainer visited={visited} story={story} />
  }

  renderMetadata () {
    const { handlePublishersPress, handleSocialCountPress, story, visited } = this.props

    return (
      <StoryMetadata
        visited={visited}
        story={story}
        onSocialCountPress={handleSocialCountPress}
        onPublishersPress={handlePublishersPress}
      />
    )
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
  handleDialogButtonPress: PropTypes.func.isRequired,
  handlePublishersPress: PropTypes.func.isRequired,
  handleSocialCountPress: PropTypes.func.isRequired,
  visited: PropTypes.bool.isRequired
}

export default Story
