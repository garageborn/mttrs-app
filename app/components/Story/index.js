/* eslint-disable no-return-assign */
import React, { PropTypes } from 'react'
import { View } from 'react-native'
import SummaryContainer from '../../containers/SummaryContainer'
import StoryMainLink from '../StoryMainLink'
import StoryMetadata from '../StoryMetadata'
import styles from './styles'

const Story = ({ handleDialogButtonPress, handlePublishersPress, handleSocialCountPress, openLink, story }) => {
  const renderSummary = () => {
    const { headline, summary } = story
    if (!headline || !headline.length > 0) return null
    if (!summary || !summary.length > 0) return null
    return <SummaryContainer story={story} />
  }

  if (!story) return null
  return (
    <View style={styles.card}>
      <StoryMainLink
        onPress={openLink}
        story={story}
        openDialog={handleDialogButtonPress}
      />
      {renderSummary()}
      <StoryMetadata
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
      image_source_url: PropTypes.string
    }).isRequired,
    links_count: PropTypes.number.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string
    }),
    publishers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon_id: PropTypes.string
      })
    ).isRequired
  }).isRequired,
  openLink: PropTypes.func.isRequired,
  handleDialogButtonPress: PropTypes.func.isRequired,
  handlePublishersPress: PropTypes.func.isRequired,
  handleSocialCountPress: PropTypes.func.isRequired
}

export default Story
