import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import DialogButton from '../DialogButton'
import Touchable from '../Touchable'

const shareIcon = require('../StoryDialog/assets/share.png')

class CategoryDialogButton extends Component {
  render () {
    const { category, onPress } = this.props
    return (
      <Touchable onPress={() => onPress(category)}>
        <View>
          <DialogButton icon={shareIcon} messages={[category.name]} />
        </View>
      </Touchable>
    )
  }
}

CategoryDialogButton.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string
  }).isRequired,
  onPress: PropTypes.func.isRequired
}

export default CategoryDialogButton
