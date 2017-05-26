import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

const CategoriesTabBarLabel = (props) => {
  const getColor = () => {
    return { color: props.category.color }
  }

  return (
    <View>
      <Text style={[styles.text, getColor()]}>{props.category.name}</Text>
    </View>
  )
}

export default CategoriesTabBarLabel
