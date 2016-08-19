import React, { Component, PropTypes } from 'react'
import { Text } from 'react-native'
import styles from '../styles/app.ios'

class CategoryNavItem extends Component {
  render () {
    const { category } = this.props
    return (
      <Text style={styles.navItem}>{category.name}</Text>
    )
  }
}

CategoryNavItem.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
}

export default CategoryNavItem
