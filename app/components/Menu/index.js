import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import MenuIOS from '../MenuIOS'
import MenuAndroid from '../MenuAndroid'
import styles from './styles'

class Menu extends Component {
  render () {
    let menu = Platform.select({
      ios: <MenuIOS {...this.props} />,
      android: <MenuAndroid {...this.props} />
    })
    return (
      <View style={styles.menu}>
        {menu}
      </View>
    )
  }
}

export default Menu
