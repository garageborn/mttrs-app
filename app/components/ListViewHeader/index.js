import React, { PropTypes } from 'react'
import { View } from 'react-native'
import _result from 'lodash/result'
import ParsedDate from '../ParsedDate'
import styles from './styles'

const ListViewHeader = ({ date, renderOptions }) => {
  const type = _result(renderOptions, 'type')

  return (
    <View style={styles.header}>
      <ParsedDate style={styles.title} date={date} type={type} />
    </View>
  )
}

ListViewHeader.propTypes = {
  date: PropTypes.number.isRequired,
  renderOptions: PropTypes.shape({
    type: PropTypes.string
  })
}

export default ListViewHeader
