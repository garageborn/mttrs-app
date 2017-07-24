import React, { Component } from 'react'
import Orientation from 'react-native-orientation'

class OrientationContainer extends Component {
  componentWillMount () {
    Orientation.unlockAllOrientations()
  }

  componentWillUnmount () {
    Orientation.lockToPortrait()
  }

  render () {
    return null
  }
}

export default OrientationContainer
