import React, { Component, PropTypes } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import styles from '../styles/Header'
import { TRANSPARENT } from '../../constants/TouchUnderlayColors'

class Header extends Component {
  render() {
    const { title, icon, toggleMenu } = this.props

    return (
      <View style={styles.header}>
        <TouchableHighlight onPress={toggleMenu} underlayColor={TRANSPARENT}>
          <View style={styles.headerContainer}>
            <Image style={styles.icon} source={icon} />
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
