import React from 'react'
import {
  View,
  Animated
} from 'react-native'

const ProgressBar = ({ progress, color }) => {
  return <Animated.View style={{width: progress, height: 3, backgroundColor: color}} />
}

export default ProgressBar
