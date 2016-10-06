import React, { Component } from 'react'
import { View } from 'react-native'
import TimelineHeaderContainer from './TimelineHeaderContainer'
import TimelineContainer from './TimelineContainer'

class TimelineSceneContainer extends Component {
  static route = {
    navigationBar: {
      renderTitle: (route) => <TimelineHeaderContainer params={route.params}/>,
      backgroundColor: '#262C5B'
    }
  }

  render() {
    const { route } = this.props
    return <TimelineContainer params={route.params}/>
  }
}

export default TimelineSceneContainer
