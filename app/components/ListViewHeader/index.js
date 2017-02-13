import React, { PropTypes } from 'react'
import { View } from 'react-native'
import ParsedDate from '../ParsedDate'
import styles from './styles'

const ListViewHeader = ({ date }) => (
  <View style={styles.header}>
    <ParsedDate style={styles.title} date={date} />
  </View>
)

ListViewHeader.propTypes = {
  date: PropTypes.number.isRequired
}

export default ListViewHeader
