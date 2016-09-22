import React, { Component, PropTypes } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import styles from '../styles/Menu'

class CategoryTile extends Component {
  render() {
    const { onPress, category } = this.props
    const { name, color, slug } = category
    let icon = require('../assets/icons/icon-business.png')
    return (
      <TouchableHighlight style={styles.categoryTouch} onPress={e => onPress(category)}>
        <View style={styles.category} shadowOffset={{width: 1, height: 2}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1.0}>
          <Image style={styles.categoryIcon} source={icon} />
          <Text style={[styles.categoryName, {color: '#373737'}]}>{name}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

CategoryTile.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.any.isRequired,
  }),
  onPress: PropTypes.func.isRequired
}

export default CategoryTile
