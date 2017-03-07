import React, { PropTypes } from 'react'
import { View } from 'react-native'
import Touchable from '../../../Touchable'
import { WHITE_TRANSPARENT_COLOR } from '../../../../constants/TouchUnderlayColors'
import styles from './styles'

const Button = (props) => {
  return (
    <Touchable onPress={props.onPress} underlayColor={WHITE_TRANSPARENT_COLOR} >
      <View style={[styles.button, props.skin]}>{props.children}</View>
    </Touchable>
  )
}

Button.propTypes = {
  children: PropTypes.any,
  onPress: PropTypes.func.isRequired,
  skin: PropTypes.number.isRequired
}

export default Button
