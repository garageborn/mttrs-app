import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'

const CategoriesDialog = ({ type, children }) => (
  <View style={styles[type]}>
    {children}
  </View>
)

CategoriesDialog.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired
}

export default CategoriesDialog
