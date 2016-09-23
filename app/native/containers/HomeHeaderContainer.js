import React, { Component } from 'react'
import { View, Image, TouchableHighlight, Text } from 'react-native'
import styles from '../styles/Menu'
import { Actions } from 'react-native-router-flux'

class HomeHeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  render() {
    return (
      <View style={styles.menu}>
        <TouchableHighlight style={styles.header} onPress={this.toggleMenu}>
          <Image source={require('../assets/icons/icon-top-stories.png')} />
          <Text style={styles.headerTitle}>Top Stories</Text>
          <Image source={require('../assets/arrow.png')} />
        </TouchableHighlight>
      </View>
    )
  }

  toggleMenu() {
    Actions.menu()
  }
}

export default HomeHeaderContainer
