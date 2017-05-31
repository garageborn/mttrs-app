import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import Touchable from '../Touchable'
import StoryImage from '../StoryImage'
import StoryTitle from '../StoryTitle'
import StoryCategory from '../StoryCategory'
import StoryDialogButton from '../StoryDialogButton'
import { WHITE_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

class StoryMainLink extends Component {
  render () {
    const { onPress, openDialog, story, visited } = this.props
    return (
      <Touchable onPress={onPress} activeOpacity={0.7} underlayColor={WHITE_COLOR} >
        <View style={styles.content}>
          <StoryImage visited={visited} source={this.mainLink.image_source_url} story={story} />
          <View>
            <StoryTitle visited={visited} title={this.mainLink.title} />
            {this.renderStoryCategory()}
          </View>
          <StoryDialogButton onPress={openDialog} />
        </View>
      </Touchable>
    )
  }

  renderStoryCategory () {
    const { category } = this.props.story
    if (!category) return
    return <StoryCategory visited={this.props.visited} category={category} />
  }

  get mainLink () {
    return this.props.story.main_link
  }
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
