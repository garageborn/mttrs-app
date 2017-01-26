import React, { PropTypes } from 'react'
import { Image, View } from 'react-native'
import Touchable from '../Touchable'
import styles from './styles'

const CloseButton = ({ onPress }) => {
  return (
    <View style={styles.closeButton}>
      <Touchable onPress={onPress} underlayColor={'transparent'}>
        <Image style={styles.closeButtonIcon} source={require('../../assets/icons/icon-close-modal@3x.png')} />
      </Touchable>
    </View>
  )
}

CloseButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default CloseButton
