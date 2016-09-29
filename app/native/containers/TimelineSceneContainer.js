import React, { Component } from 'react'
import { View } from 'react-native'
import TimelineHeaderContainer from './TimelineHeaderContainer'
import TimelineContainer from './TimelineContainer'
import styles from '../styles/App'

class TimelineSceneContainer extends Component {
  static route = {
    navigationBar: {
      renderTitle: (route) => <TimelineHeaderContainer params={route.params}/>
    }
  }

  render() {
    const { route } = this.props
    return (
      <View style={styles.container}>
        <TimelineContainer params={route.params}/>
      </View>
    )
  }
}

export default TimelineSceneContainer
