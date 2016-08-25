import React, { Component, PropTypes } from 'react'
import { View, Text } from 'react-native'
import styles from '../styles/ListViewHeader'

class ListViewHeader extends Component {
  render() {
    const { date } = this.props

    return (
      <View style={styles.header}>
        <Text style={styles.title}>{date}</Text>
      </View>
    )
  }
}

ListViewHeader.propTypes = {
  date: PropTypes.string.isRequired
}

export default ListViewHeader
