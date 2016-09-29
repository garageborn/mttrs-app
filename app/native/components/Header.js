import React, { Component, PropTypes } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import styles from '../styles/Header'

class Header extends Component {
  render() {
    const { title, toggleMenu } = this.props
    return (
      <View style={styles.header}>
        <TouchableHighlight onPress={toggleMenu}>
          <View style={styles.headerContainer}>
            <Image source={require('../assets/icons/icon-top-stories.png')} />
            <Text style={styles.headerTitle}>{title}</Text>
            <Image source={require('../assets/arrow.png')} />
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string,
  toggleMenu: PropTypes.func.isRequired
}

export default Header
