import React, { Component } from 'react'
import { View } from 'react-native'
import HomeHeaderContainer from './HomeHeaderContainer'
import TimelineContainer from './TimelineContainer'
import styles from '../styles/App'

class HomeSceneContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HomeHeaderContainer />
        <TimelineContainer />
      </View>
    )
  }
}

export default HomeSceneContainer
