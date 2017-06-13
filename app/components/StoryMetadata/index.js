import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'
import StoryPublishers from '../StoryPublishers'
import SocialCount from '../SocialCount'
import Touchable from '../Touchable'
import { WHITE_COLOR } from '../../constants/TouchUnderlayColors'

const StoryMetadata = ({ onPublishersPress, onSocialCountPress, story }) => (
  <View style={styles.container}>
    <Touchable onPress={onPublishersPress} underlayColor={WHITE_COLOR}>
      <View>
        <StoryPublishers story={story} />
      </View>
    </Touchable>
    <Touchable onPress={onSocialCountPress} underlayColor={WHITE_COLOR}>
      <View>
        <SocialCount totalSocial={story.total_social} />
      </View>
    </Touchable>
  </View>
)

StoryMetadata.propTypes = {
  onPublishersPress: PropTypes.func.isRequired,
  onSocialCountPress: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
}

export default StoryMetadata
