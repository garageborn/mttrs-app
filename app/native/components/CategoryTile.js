import React, { PropTypes } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import styles from '../styles/Menu'

const CategoryTile = ({ name, icon, color }) => {
  return (
    <TouchableHighlight style={{height: 105}}>
      <View style={styles.category} shadowOffset={{width: 1, height: 2}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1.0}>
        <Image style={styles.categoryIcon} source={icon} />
        <Text style={[styles.categoryName, {color: color || '#373737'}]}>{name}</Text>
      </View>
    </TouchableHighlight>
  )
}

CategoryTile.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  color: PropTypes.string.isRequired
}

export default CategoryTile
