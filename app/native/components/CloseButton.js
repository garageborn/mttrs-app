import React from 'react'
import { Image, TouchableHighlight } from 'react-native'
import styles from '../styles/Buttons'

const CloseButton = ({onPress}) => {
  return (
    <TouchableHighlight style={styles.closeButton} onPress={onPress}>
      <Image style={styles.closeButtonIcon} source={require('../assets/icons/icon-close-modal@3x.png')} />
    </TouchableHighlight>
  )
}

export default CloseButton
