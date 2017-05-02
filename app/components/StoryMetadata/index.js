import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import styles from './styles'
import StoryPublishers from '../StoryPublishers'
import SocialCount from '../SocialCount'
import Touchable from '../Touchable'
import { WHITE_COLOR } from '../../constants/TouchUnderlayColors'

class StoryMetadata extends Component {
  render () {
    const { onPublishersPress, story } = this.props
    return (
      <View style={this.containerStyles}>
        <Touchable onPress={onPublishersPress} underlayColor={WHITE_COLOR}>
          <View>
            <StoryPublishers story={story} />
          </View>
        </Touchable>
        <Touchable onPress={onPublishersPress} underlayColor={WHITE_COLOR}>
          <View>
            <SocialCount totalSocial={story.total_social} />
          </View>
        </Touchable>
      </View>
    )
  }

  get containerStyles () {
    if (!this.props.visited) return styles.container
    return [styles.container, styles.visited]
  }
}

StoryMetadata.propTypes = {
  visited: PropTypes.bool.isRequired,
  onPublishersPress: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
}

export default StoryMetadata
