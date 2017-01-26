import React, { PropTypes } from 'react'
import { View, Dimensions } from 'react-native'
import styles from './styles'

const { width } = Dimensions.get('window')

const CategoryColor = ({ color, categoriesLength, isActive }) => {
  let getBorderWidth = () => {
    let currentSize = width
    let colorsShown = categoriesLength + 1
    while ((currentSize % colorsShown) !== 0) currentSize++
    return currentSize - width
  }

  let categoryColorStyles = () => {
    let categoryStyles = [styles.color, {backgroundColor: color, height: isActive ? 12 : 2}]
    if (isActive) return [...categoryStyles, {borderRightWidth: getBorderWidth(), borderColor: color}]
    return categoryStyles
  }

  return (
    <View style={categoryColorStyles()} />
  )
}

CategoryColor.propTypes = {
  categoriesLength: PropTypes.number,
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool
}

export default CategoryColor
