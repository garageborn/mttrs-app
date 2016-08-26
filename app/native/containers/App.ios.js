import React, { Component } from 'react'
import { View } from 'react-native'
import HeaderContainer from './HeaderContainer'
import TimelineContainer from './TimelineContainer'

class App extends Component {
  render () {
    return (
      <View>
        <HeaderContainer />
        <TimelineContainer />
      </View>
    )
  }
}

export default App
