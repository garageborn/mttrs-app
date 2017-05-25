import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import Touchable from '../Touchable'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const Button = ({ background, content, onPress, size }) => {
  const containerStyles = () => {
    return [styles.container, styles[background], styles[size]]
  }
  const textStyles = () => {
    const textColor = `${background}Text`
    const textSize = `${size}Text`
    return [styles.text, styles[textColor], styles[textSize]]
  }
  return (
    <Touchable onPress={onPress} underlayColor={WHITE_TRANSPARENT_COLOR} >
      <View style={containerStyles()}>
        <Text style={textStyles()}>{content}</Text>
      </View>
    </Touchable>
  )
}

Button.propTypes = {
  background: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired
}

export default Button
