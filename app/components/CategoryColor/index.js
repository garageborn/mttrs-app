import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'
import _result from 'lodash/result'

const CategoryColor = ({ category }) => {
  const categoryColor = _result(category, 'color')
  const categoryStyle = categoryColor ? { borderBottomColor: categoryColor } : {}
  return <View style={[styles.container, categoryStyle]} />
}

CategoryColor.propTypes = {
  category: PropTypes.shape({
    color: PropTypes.string
  })
}

export default CategoryColor
