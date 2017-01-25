import React, { PropTypes } from 'react'
import { TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native'

const Component = Platform.select({
  ios: TouchableHighlight,
  android: TouchableNativeFeedback
})

const Touchable = props => <Component {...props}>{props.children}</Component>

Touchable.propTypes = {
  children: PropTypes.node.isRequired
}

export default Touchable
