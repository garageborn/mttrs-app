import React, { PropTypes } from 'react'
import { Text } from 'react-native'
import styles from './styles'

const PageDescription = ({ children }) => (
  <Text style={styles.description}>{children}</Text>
)

PageDescription.propTypes = {
  children: PropTypes.node.isRequired
}

export default PageDescription
