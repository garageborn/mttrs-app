import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'

const CategoryColor = ({ color, isActive }) => {
  let cx = () => {
    return [styles.color, {backgroundColor: color, height: isActive ? 12 : 2}]
  }

  return (
    <View style={cx()} />
  )
}

CategoryColor.propTypes = {
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool
}

export default CategoryColor
