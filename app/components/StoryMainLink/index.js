import React, { PropTypes } from 'react'
import { TouchableHighlight, Text, View } from 'react-native'
import styles from './styles'
import StoryImage from '../StoryImage'
import StoryTitle from '../StoryTitle'
import { WHITE_COLOR } from '../../constants/TouchUnderlayColors'

const StoryMainLink = ({onPress, mainLink}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.7}
      underlayColor={WHITE_COLOR}
    >
      <View style={styles.content}>
        <StoryImage source={mainLink.image_source_url} />
        <StoryTitle title={mainLink.title} />
      </View>
    </TouchableHighlight>
  )
}

StoryMainLink.propTypes = {
  onPress: PropTypes.func.isRequired,
  mainLink: PropTypes.object.isRequired
}

export default StoryMainLink
