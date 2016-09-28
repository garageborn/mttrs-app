import React, { Component } from 'react'
import { View } from 'react-native'
import HomeHeaderContainer from './HomeHeaderContainer'
import TimelineContainer from './TimelineContainer'
import styles from '../styles/App'

class HomeSceneContainer extends Component {
  static route = {
    navigationBar: {
      renderTitle: () => <HomeHeaderContainer />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TimelineContainer />
      </View>
    )
  }
}

export default HomeSceneContainer
