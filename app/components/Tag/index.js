import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import Touchable from '../Touchable'
import styles from './styles'

const Tag = ({ onPress, children, active, last }) => {
  let getStyle = () => {
    let containerStyles = [styles.container]
    if (active) containerStyles = [...containerStyles, styles.active]
    if (last) containerStyles = [...containerStyles, styles.last]
    return containerStyles
  }

  return (
    <View style={getStyle()}>
      <Touchable
        useForeground
        style={{borderRadius: 20}}
        delayPressIn={0}
        onPress={onPress}
        underlayColor={'transparent'}
      >
        <Text style={styles.text}>{children}</Text>
      </Touchable>
    </View>
  )
}

Tag.propTypes = {
  children: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  last: PropTypes.bool
}

export default Tag
