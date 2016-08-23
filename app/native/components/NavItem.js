import React, { Component, PropTypes } from 'react'
import { Text } from 'react-native'
import styles from '../styles/app.ios'

class NavItem extends Component {
  render() {
    const { category, onPress } = this.props
    return (
      <Text onPress={e => onPress(category)} style={styles.navItem}>{category.name}</Text>
    )
  }
}

NavItem.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  onPress: PropTypes.func.isRequired
}

export default NavItem
