import React, { Component } from 'react'
import { View } from 'react-native'
import StoryHeaderContainer from './StoryHeaderContainer'
import styles from '../styles/App'

class StorySceneContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StoryHeaderContainer />
      </View>
    )
  }
}

export default StorySceneContainer
