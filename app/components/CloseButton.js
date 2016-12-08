import React from 'react'
import { Image, TouchableHighlight, View } from 'react-native'
import styles from '../styles/Buttons'

const CloseButton = ({onPress}) => {
  return (
    <View style={styles.closeButton}>
      <TouchableHighlight onPress={onPress} underlayColor={'transparent'}>
        <Image style={styles.closeButtonIcon} source={require('../assets/icons/icon-close-modal@3x.png')} />
      </TouchableHighlight>
    </View>
  )
}

export default CloseButton
