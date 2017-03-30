import React, { PropTypes } from 'react'
import { Image, View } from 'react-native'
import Touchable from '../Touchable'
import styles from './styles'

const closeButtonIcon = require('./assets/image.png')

const CloseButton = ({ onPress }) => {
  return (
    <View style={styles.closeButton}>
      <Touchable onPress={onPress} underlayColor={'transparent'}>
        <Image style={styles.closeButtonIcon} source={closeButtonIcon} />
      </Touchable>
    </View>
  )
}

CloseButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default CloseButton
