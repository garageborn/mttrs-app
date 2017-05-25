import React, { Component, PropTypes } from 'react'
import { Text } from 'react-native'
import DialogButton from '../DialogButton'
import Touchable from '../Touchable'

const shareIcon = require('../StoryDialog/assets/share.png')

class FavoriteCategoryButton extends Component {
  render () {
    const { category, onPress } = this.props
    return (
      <Touchable onPress={() => onPress(category)}>
        { /*<DialogButton icon={shareIcon} messages={[category.name]} /> */ }
        <Text>{category.name}</Text>
      </Touchable>
    )
  }
}

FavoriteCategoryButton.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string
  }).isRequired,
  onPress: PropTypes.func.isRequired
}

export default FavoriteCategoryButton
