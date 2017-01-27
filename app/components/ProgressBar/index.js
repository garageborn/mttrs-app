import React from 'react'
import { ProgressViewIOS, ProgressBarAndroid, Platform } from 'react-native'

const Component = Platform.select({
  ios: ProgressViewIOS,
  android: ProgressBarAndroid
})

const ProgressBar = props => <Component {...props} />

export default ProgressBar
