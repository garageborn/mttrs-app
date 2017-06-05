import React, { PropTypes } from 'react'
import { View } from 'react-native'
import Touchable from '../Touchable'
import StoryImage from '../StoryImage'
import StoryTitle from '../StoryTitle'
import StoryCategory from '../StoryCategory'
import StoryDialogButton from '../StoryDialogButton'
import { WHITE_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const StoryMainLink = ({ onPress, openDialog, story, visited }) => {
  const mainLink = story.main_link

  const renderStoryCategory = () => {
    if (!story.category) return
    return <StoryCategory visited={visited} category={story.category} />
  }

  return (
    <Touchable onPress={onPress} activeOpacity={0.7} underlayColor={WHITE_COLOR} >
      <View style={styles.content}>
        <StoryImage visited={visited} source={mainLink.image_source_url} story={story} />
        <View>
          <StoryTitle visited={visited} title={mainLink.title} />
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
  }).isRequired,
  visited: PropTypes.bool.isRequired
}

export default StoryMainLink
