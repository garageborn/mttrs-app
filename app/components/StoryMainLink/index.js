import React, { PropTypes } from 'react'
import { View } from 'react-native'
import Touchable from '../Touchable'
import StoryImage from '../StoryImage'
import StoryTitle from '../StoryTitle'
import StoryCategory from '../StoryCategory'
import { WHITE_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const StoryMainLink = ({onPress, mainLink, mainCategory, isSceneHome}) => {
  let renderStoryCategory = <StoryCategory category={mainCategory} />
  return (
    <Touchable
      onPress={onPress}
      activeOpacity={0.7}
      underlayColor={WHITE_COLOR}
    >
      <View style={styles.content}>
        <StoryImage source={mainLink.image_source_url} />
        <View>
          <StoryTitle title={mainLink.title} />
          {renderStoryCategory}
        </View>
      </View>
    </Touchable>
  )
}

StoryMainLink.propTypes = {
  onPress: PropTypes.func.isRequired,
  mainLink: PropTypes.object.isRequired,
  mainCategory: PropTypes.object.isRequired,
  isSceneHome: PropTypes.bool.isRequired
}

export default StoryMainLink
