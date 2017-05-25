import React, { PropTypes, Component } from 'react'
import { Text } from 'react-native'
import Touchable from '../Touchable'
import { WHITE_COLOR } from '../../constants/TouchUnderlayColors'

class StoryDialogButton extends Component {
  render () {
    const { onPress } = this.props

    return (
      <Touchable onPress={onPress} activeOpacity={0.7} underlayColor={WHITE_COLOR} >
        <Text>OpenDialog</Text>
      </Touchable>
    )
  }
}

StoryDialogButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default StoryDialogButton
