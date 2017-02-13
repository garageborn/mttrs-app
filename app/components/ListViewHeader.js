import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import ParsedDate from './ParsedDate'
import styles from '../styles/ListViewHeader'

class ListViewHeader extends Component {
  render () {
    const { date } = this.props

    return (
      <View style={[styles.header, {
        marginTop: date === 'Today' ? 20 : null
      }]}
      >
        <ParsedDate style={styles.title} date={date} />
      </View>
    )
  }
}

ListViewHeader.propTypes = {
  date: PropTypes.number.isRequired
}

export default ListViewHeader
