import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import Touchable from '../Touchable'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const Button = ({ onPress, label, skin }) => (
  <Touchable
    onPress={onPress}
    underlayColor={WHITE_TRANSPARENT_COLOR}
  >
    <View>
      <Text style={[styles.button, skin]}>{label}</Text>
    </View>
  </Touchable>
)

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  skin: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired
}

export default Button
