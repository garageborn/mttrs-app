/* eslint-disable no-return-assign */
import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import SummaryContainer from '../../containers/SummaryContainer'
import StoryMainLink from '../StoryMainLink'
import StoryMetadata from '../StoryMetadata'
import styles from './styles'

const Story = ({ handleDialogButtonPress, handlePublishersPress, handleSocialCountPress, openLink, story, visited }) => {
  const renderSummary = () => {
    const { headline, summary } = story
    if (!headline || !headline.length > 0) return null
    if (!summary || !summary.length > 0) return null
    return <SummaryContainer visited={visited} story={story} />
  }

  if (!story) return null
  return (
    <View style={styles.card}>
      <StoryMainLink
        visited={visited}
        onPress={openLink}
        story={story}
        openDialog={handleDialogButtonPress}
      />
      {renderSummary()}
      <StoryMetadata
        visited={visited}
        story={story}
        onSocialCountPress={handleSocialCountPress}
        onPublishersPress={handlePublishersPress}
      />
    </View>
  )
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
