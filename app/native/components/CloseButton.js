import React from 'react'
import { Image, TouchableHighlight } from 'react-native'

const CloseButton = ({ onClose }) => {
  return (
    <TouchableHighlight onPress={onClose}>
      <Image source={require('../assets/icons/icon-close-modal@3x.png')} />
    </TouchableHighlight>
  )
}

export default CloseButton
