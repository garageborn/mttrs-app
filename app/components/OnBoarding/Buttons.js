import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import Touchable from '../Touchable'

const SymbolButton = ({ size, onPress, style, textStyle, children }) => (
  <View style={{height: size, width: size, justifyContent: 'center', ...style}}>
    <Touchable style={{flex: 0}} onPress={onPress}>
      <Text style={{textAlign: 'center', fontSize: size / 1.7, ...textStyle}}>{children}</Text>
    </Touchable>
  </View>
)

const TextButton = ({ size, onPress, textStyle, children }) => (
  <View style={{flex: 0}}>
    <Touchable style={{flex: 0}} onPress={onPress}>
      <Text style={{fontSize: size / 2.5, ...textStyle}}>{children}</Text>
    </Touchable>
  </View>
)

SymbolButton.propTypes = {
  size: PropTypes.number,
  onPress: PropTypes.func,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  children: PropTypes.node.isRequired
}

TextButton.propTypes = {
  size: PropTypes.number,
  onPress: PropTypes.func,
  textStyle: PropTypes.object,
  children: PropTypes.node.isRequired
}

export { SymbolButton, TextButton }
