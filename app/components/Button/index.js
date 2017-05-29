import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import Touchable from '../Touchable'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const Button = ({ background, content, inactive, onPress, size }) => {
  const containerStyles = () => {
    const stylesArray = [styles.container, styles[background], styles[size]]
    if (inactive) return [...stylesArray, styles.inactive]
    return stylesArray
  }

  const textStyles = () => {
    const textColor = `${background}Text`
    const textSize = `${size}Text`
    const stylesArray = [styles.text, styles[textColor], styles[textSize]]
    if (inactive) return [...stylesArray, styles.inactiveText]
    return stylesArray
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
  content: PropTypes.any.isRequired,
  inactive: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired
}

export default Button
