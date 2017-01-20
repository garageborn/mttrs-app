import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'

const CategoryColor = ({ color, isActive }) => {
  let categoryColorStyles = () => {
    return [styles.color, {backgroundColor: color, height: isActive ? 12 : 2}]
  }

  return (
    <View style={categoryColorStyles()} />
  )
}

CategoryColor.propTypes = {
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool
}

export default CategoryColor
