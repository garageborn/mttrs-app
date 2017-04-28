import React, { PropTypes } from 'react'
import { View } from 'react-native'
import ParsedDate from '../ParsedDate'
import styles from './styles'

const ListViewHeader = ({ date, type }) => (
  <View style={styles.header}>
    <ParsedDate style={styles.title} date={date} type={type} />
  </View>
)

ListViewHeader.propTypes = {
  date: PropTypes.number.isRequired,
  type: PropTypes.string
}

export default ListViewHeader
