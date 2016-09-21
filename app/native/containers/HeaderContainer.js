import React, { Component } from 'react'
import { View, Image, TouchableHighlight } from 'react-native'
import styles from '../styles/Header'
import { Actions } from 'react-native-router-flux'

class HeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <TouchableHighlight onPress={this.toggleMenu}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  toggleMenu() {
    Actions.menu()
  }
}

export default HeaderContainer
