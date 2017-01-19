import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'

const CategoryColor = ({color}) => {
  return (
    <View style={[styles.color, {backgroundColor: color}]} />
  )
}

CategoryColor.propTypes = {
  color: PropTypes.string.isRequired
}

export default CategoryColor
