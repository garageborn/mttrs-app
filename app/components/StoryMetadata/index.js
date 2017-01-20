import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'
import StoryPublishers from '../StoryPublishers'
import SocialCount from '../SocialCount'

const StoryMainLink = ({story, onPublishersPress}) => {
  return (
    <View style={styles.footer}>
      <StoryPublishers story={story} openStoryLinks={onPublishersPress} />
      <SocialCount totalSocial={story.total_social} />
    </View>
  )
}

StoryMainLink.propTypes = {
  onPublishersPress: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
}

export default StoryMainLink
