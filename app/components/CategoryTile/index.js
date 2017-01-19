/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const CategoryTile = ({ onPress, category }) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight underlayColor={WHITE_TRANSPARENT_COLOR} onPress={e => onPress(category)}>
        <View style={styles.category} shadowOffset={{width: 0, height: 2}} shadowColor={'rgba(0, 0, 0, 1)'} shadowOpacity={0.5} elevation={1}>
          <Text style={styles.name}>{category.name}</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

CategoryTile.propTypes = {
  category: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
}

export default CategoryTile
