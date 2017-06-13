import React, { PropTypes } from 'react'
import { View } from 'react-native'
import Touchable from '../Touchable'
import StoryImage from '../StoryImage'
import StoryTitle from '../StoryTitle'
import StoryCategory from '../StoryCategory'
import StoryDialogButton from '../StoryDialogButton'
import { WHITE_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const StoryMainLink = ({ onPress, openDialog, story }) => {
  const mainLink = story.main_link

  const renderStoryCategory = () => {
    if (!story.category) return
    return <StoryCategory category={story.category} />
  }

  return (
    <Touchable onPress={onPress} activeOpacity={0.7} underlayColor={WHITE_COLOR} >
      <View style={styles.content}>
        <StoryImage source={mainLink.image_source_url} story={story} />
        <View>
          <StoryTitle title={mainLink.title} />
          {renderStoryCategory()}
        </View>
        <StoryDialogButton onPress={openDialog} />
      </View>
    </Touchable>
  )
}

StoryMainLink.propTypes = {
  onPress: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  story: PropTypes.shape({
    id: PropTypes.any.isRequired
  }).isRequired
}

export default StoryMainLink
