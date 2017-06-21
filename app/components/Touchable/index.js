import React, { PropTypes } from 'react'
import { TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native'
import _throttle from 'lodash/throttle'

const Component = Platform.select({
  ios: TouchableHighlight,
  android: TouchableNativeFeedback
})

const Touchable = props => {
  const onPress = _throttle(props.onPress, 500, { trailing: false })
  return <Component {...props} onPress={onPress}>{props.children}</Component>
}

Touchable.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func
}

export default Touchable
