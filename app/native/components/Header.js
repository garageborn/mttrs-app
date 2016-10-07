import React, { Component, PropTypes } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import styles from '../styles/Header'

class Header extends Component {
  getIconStyles() {
    const { icon } = this.props
    let iconStyles = {}

    if (typeof icon === 'object') {
      iconStyles = {
        width: 35,
        height: 35
      }
    }

    return iconStyles
  }

  render() {
    const { title, icon, toggleMenu } = this.props

    return (
      <View style={styles.header}>
        <TouchableHighlight onPress={toggleMenu}>
          <View style={styles.headerContainer}>
            <Image style={this.getIconStyles()} source={icon} />
            <Text style={styles.headerTitle}>{title}</Text>
            <Image source={require('../assets/arrow.png')} />
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  toggleMenu: PropTypes.func.isRequired
}

export default Header
