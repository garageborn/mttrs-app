import React from 'react'
import { View, Text, Image } from 'react-native'

const CategoryTile = ({ styles, name, icon }) => {
  return (
    <View style={styles.category}>
      <Image style={styles.categoryIcon} source={icon} />
      <Text style={styles.categoryName}>{name}</Text>
    </View>
  )
}

export default CategoryTile
