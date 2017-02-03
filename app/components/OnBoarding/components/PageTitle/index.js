import React, { PropTypes } from 'react'
import { Text } from 'react-native'
import styles from './styles'

const PageTitle = ({title}) => (
  <Text style={styles.title}>{title}</Text>
)

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
}

export default PageTitle
