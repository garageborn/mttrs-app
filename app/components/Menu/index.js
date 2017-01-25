import React from 'react'
import { View, Platform } from 'react-native'
import MenuIOS from '../MenuIOS'
import MenuAndroid from '../MenuAndroid'
import styles from './styles'

const Menu = (props) => {
  let menu = Platform.select({
    ios: <MenuIOS {...props} />,
    android: <MenuAndroid {...props} />
  })
  return (
    <View style={styles.menu}>
      {menu}
    </View>
  )
}

export default Menu
