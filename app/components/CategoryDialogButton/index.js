import React, { PropTypes } from 'react'
import { View } from 'react-native'
import DialogButton from '../DialogButton'
import Touchable from '../Touchable'
import styles from './styles'
import { DEFAULT_CATEGORY_COLOR } from '../../constants/Colors'

const CategoryDialogButton = ({ category, onPress }) => {
  const backgroundColor = category.color || DEFAULT_CATEGORY_COLOR
  const icon = <View style={[styles.icon, { backgroundColor: backgroundColor }]} />

  return (
    <Touchable underlayColor={'rgba(255, 255, 255, .2)'} onPress={() => onPress(category)}>
      <View>
        <DialogButton icon={icon} messages={[category.name]} />
      </View>
    </Touchable>
  )
}

CategoryDialogButton.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string
  }).isRequired,
  onPress: PropTypes.func.isRequired
}

export default CategoryDialogButton
