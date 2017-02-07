import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'

const PageHeader = ({ children }) => (
  <View style={styles.header}>{children}</View>
)

PageHeader.propTypes = {
  children: PropTypes.node.isRequired
}

export default PageHeader
