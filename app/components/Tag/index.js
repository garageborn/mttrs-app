import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import Touchable from '../Touchable'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const Tag = ({ onPress, children, active }) => {
  let getStyle = () => {
    let containerStyles = styles.container
    if (active) containerStyles = [containerStyles, styles.active]
    return containerStyles
  }
  return (
    <Touchable onPress={onPress} underlayColor={WHITE_TRANSPARENT_COLOR}>
      <View style={getStyle()}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Touchable>
  )
}

Tag.propTypes = {
  children: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
}

export default Tag
