/* eslint-disable react/jsx-no-bind */
import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

class CategoryTile extends Component {
  render () {
    const { onPress, category } = this.props

    return (
      <View style={styles.container}>
        <TouchableHighlight underlayColor={WHITE_TRANSPARENT_COLOR} onPress={e => onPress(category)}>
          <View style={this.categoryStyle} shadowOffset={{width: 0, height: 2}} shadowColor={'rgba(0, 0, 0, 1)'} shadowOpacity={0.5} elevation={1}>
            <Text style={this.categoryNameStyle}>{category.name}</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  get categoryStyle () {
    const { category, isActive } = this.props
    return isActive ? [styles.category, { backgroundColor: category.color }] : styles.category
  }

  get categoryNameStyle () {
    const { category, isActive } = this.props
    const { color } = category
    return isActive ? [styles.name, { color: '#FFF' }] : [styles.name, { color }]
  }
}

CategoryTile.propTypes = {
  category: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
}

export default CategoryTile
