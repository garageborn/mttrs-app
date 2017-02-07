import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'

const Dot = ({ selected }) => (
  <View
    style={[
      styles.dot,
      {backgroundColor: selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)'}
    ]}
  />
)

const PaginatorDots = ({ pages, currentPage }) => (
  <View style={styles.container}>
    {Array.from(new Array(pages), (x, i) => i).map(page => (
      <Dot key={page} selected={page === currentPage} />
    ))}
  </View>
)

Dot.propTypes = {
  selected: PropTypes.bool.isRequired
}

PaginatorDots.propTypes = {
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default PaginatorDots
