import React, { Component, PropTypes } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import styles from '../styles/Header'

class Header extends Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  render() {
    const { title } = this.props
    return (
      <View style={styles.header}>
        <TouchableHighlight onPress={this.toggleMenu}>
          <View style={styles.headerContainer}>
            <Image source={require('../assets/icons/icon-top-stories.png')} />
            <Text style={styles.headerTitle}>{title}</Text>
            <Image source={require('../assets/arrow.png')} />
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  toggleMenu() {
    const { openMenu, closeMenu, action } = this.props
    if (action === 'close') {
      closeMenu()
    } else {
      openMenu()
    }
  }
}

Header.propTypes = {
  title: PropTypes.string,
  openMenu: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired
}

export default Header
