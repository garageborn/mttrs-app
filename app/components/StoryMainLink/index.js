import React, { PropTypes } from 'react'
import { TouchableHighlight, View } from 'react-native'
import styles from './styles'
import StoryImage from '../StoryImage'
import StoryTitle from '../StoryTitle'
import StoryCategory from '../StoryCategory'

import { WHITE_COLOR } from '../../constants/TouchUnderlayColors'

const StoryMainLink = ({onPress, mainLink, mainCategory, isSceneHome}) => {
  let renderStoryCategory = null
  if (isSceneHome) renderStoryCategory = <StoryCategory category={mainCategory} />
  return (
    <TouchableHighlight
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
    </TouchableHighlight>
  )
}

StoryMainLink.propTypes = {
  onPress: PropTypes.func.isRequired,
  mainLink: PropTypes.object.isRequired,
  mainCategory: PropTypes.object.isRequired,
  isSceneHome: PropTypes.bool.isRequired
}

export default StoryMainLink
