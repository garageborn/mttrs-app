import React, { PropTypes } from 'react'
import { TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native'
import _throttle from 'lodash/throttle'

const Component = Platform.select({
  ios: TouchableHighlight,
  android: TouchableNativeFeedback
})

const throttledOnPress = (onPress) => _throttle(onPress, 500, { trailing: false })

const Touchable = props => {
  return <Component {...props} onPress={throttledOnPress(props.onPress)}>{props.children}</Component>
}

Touchable.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func
}

export default Touchable
