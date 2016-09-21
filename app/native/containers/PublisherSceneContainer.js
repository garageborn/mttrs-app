import React, { Component } from 'react'
import { View } from 'react-native'
import PublisherHeaderContainer from './PublisherHeaderContainer'
import TimelineContainer from './TimelineContainer'
import styles from '../styles/App'

class PublisherSceneContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PublisherHeaderContainer />
        <TimelineContainer />
      </View>
    )
  }
}

export default PublisherSceneContainer
