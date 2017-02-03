import React, { PropTypes } from 'react'
import { View } from 'react-native'

const PageDot = ({ selected }) => (
  <View
    style={{
      ...styles.elementDot,
      backgroundColor: selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)'
    }}
  />
)

const PageDots = ({ pages, currentPage }) => (
  <View style={styles.container}>
    {Array.from(new Array(pages), (x, i) => i).map(page => (
      <PageDot key={page} selected={page === currentPage} />
    ))}
  </View>
)

PageDot.propTypes = {
  selected: PropTypes.bool.isRequired
}

PageDots.propTypes = {
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}

const styles = {
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },

  elementDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3
  }
}

export default PageDots
