import React, { PropTypes } from 'react'
import { View, Image } from 'react-native'
import Touchable from '../Touchable'
import styles from './styles'

const image = require('./assets/image.png')

const StoryDialogButton = ({ onPress }) => (
  <Touchable onPress={onPress} activeOpacity={0.7} underlayColor={'transparent'} >
    <View style={styles.container}>
      <Image source={image} />
    </View>
  </Touchable>
)

StoryDialogButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default StoryDialogButton
