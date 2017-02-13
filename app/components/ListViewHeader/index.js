import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

const ListViewHeader = ({ date }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{date.toUpperCase()}</Text>
  </View>
)

ListViewHeader.propTypes = {
  date: PropTypes.string.isRequired
}

export default ListViewHeader
