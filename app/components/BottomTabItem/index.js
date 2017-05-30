import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

const BottomTabItem = ({ active, icon, message }) => {
  const textStyles = active ? styles.textActive : styles.text
  return (
    <View style={styles.container}>
      <View style={styles.icon}>{icon}</View>
      <Text style={textStyles}>{message}</Text>
    </View>
  )
}

BottomTabItem.propTypes = {
  active: PropTypes.bool.isRequired,
  icon: PropTypes.element,
  message: PropTypes.string.isRequired
}

export default BottomTabItem
