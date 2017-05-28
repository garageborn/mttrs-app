import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import DialogButton from '../DialogButton'
import Touchable from '../Touchable'
import styles from './styles'

class CategoryDialogButton extends Component {
  render () {
    const { category, onPress } = this.props
    return (
      <Touchable onPress={() => onPress(category)}>
        <View>
          <DialogButton icon={this.icon} messages={[category.name]} />
        </View>
      </Touchable>
    )
  }

  get icon () {
    const backgroundColor = this.props.category.color ? this.props.category.color : '#E5E5E5'
    return (
      <View style={[styles.icon, { backgroundColor: backgroundColor }]} />
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
