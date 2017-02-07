import React, { PropTypes } from 'react'
import { Text } from 'react-native'
import styles from './styles'

const PageTitle = ({ children }) => (
  <Text style={styles.title}>{children}</Text>
)

PageTitle.propTypes = {
  children: PropTypes.node.isRequired
}

export default PageTitle
