import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'

const PageText = ({ children }) => (
  <View style={styles.container}>{children}</View>
)

PageText.propTypes = {
  children: PropTypes.node.isRequired
}

export default PageText
