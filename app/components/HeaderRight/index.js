import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'

const HeaderRight = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
)

HeaderRight.propTypes = {
  children: PropTypes.any.isRequired
}

export default HeaderRight
