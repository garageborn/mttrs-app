import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

const Heading = ({ children, size, style }) => {
  return (
    <View style={style}>
      <Text style={styles[size]}>{children}</Text>
    </View>
  )
}

Heading.propTypes = {
  children: PropTypes.any,
  size: PropTypes.string.isRequired,
  style: PropTypes.number
}

export default Heading
