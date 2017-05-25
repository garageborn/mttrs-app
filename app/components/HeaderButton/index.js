import React, { Component } from 'react'
import { Image, View } from 'react-native'
import Touchable from '../Touchable'
import styles from './styles'
const image = require('./assets/image.png')

class HeaderButton extends Component {
  render () {
    return (
      <Touchable onPress={() => {}} >
        <View style={styles.container}>
          <Image source={image} />
        </View>
      </Touchable>
    )
  }
}

export default HeaderButton
