import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import Touchable from '../Touchable'
import StoryImage from '../StoryImage'
import StoryTitle from '../StoryTitle'
import StoryCategory from '../StoryCategory'
import { WHITE_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

class StoryMainLink extends Component {
  render () {
    const { onPress, mainLink, story } = this.props
    return (
      <Touchable
        onPress={onPress}
        activeOpacity={0.7}
        underlayColor={WHITE_COLOR}
      >
        <View style={styles.content}>
          <StoryImage source={mainLink.image_source_url} story={story} />
          <View>
            <StoryTitle title={mainLink.title} />
            {this.renderStoryCategory()}
          </View>
        </View>
      </Touchable>
    )
  }

  renderStoryCategory () {
    const { mainCategory, isHomeScene } = this.props
    if (isHomeScene) return <StoryCategory category={mainCategory} />
  }
}

StoryMainLink.propTypes = {
  isHomeScene: PropTypes.bool.isRequired,
  mainLink: PropTypes.object.isRequired,
  mainCategory: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  story: PropTypes.shape({
    id: PropTypes.any.isRequired
  }).isRequired
}

export default StoryMainLink
