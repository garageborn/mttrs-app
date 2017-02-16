import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'
import StoryPublishers from '../StoryPublishers'
import SocialCount from '../SocialCount'
import Touchable from '../Touchable'
import { WHITE_COLOR } from '../../constants/TouchUnderlayColors'

const StoryMainLink = ({story, onPublishersPress}) => {
  return (
    <Touchable onPress={onPublishersPress} underlayColor={WHITE_COLOR}>
      <View style={styles.footer}>
        <StoryPublishers story={story} />
        <SocialCount totalSocial={story.total_social} />
      </View>
    </Touchable>
  )
}

StoryMainLink.propTypes = {
  onPublishersPress: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
}

export default StoryMainLink
