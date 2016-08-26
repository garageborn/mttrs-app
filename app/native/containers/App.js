import React, { Component } from 'react'
import { View } from 'react-native'
import HeaderContainer from './HeaderContainer'
import TimelineContainer from './TimelineContainer'
import styles from '../styles/App'

class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <HeaderContainer />
        <TimelineContainer />
      </View>
    )
  }
}

export default App
