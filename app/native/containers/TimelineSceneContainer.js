import React, { Component } from 'react'
import { View } from 'react-native'
import TimelineHeaderContainer from './TimelineHeaderContainer'
import TimelineContainer from './TimelineContainer'

class TimelineSceneContainer extends Component {
  static route = {
    navigationBar: {
      renderTitle: (route) => <TimelineHeaderContainer params={route.params}/>,
      backgroundColor: '#F5F8FA'
    }
  }

  render() {
    const { route } = this.props
    return <TimelineContainer params={route.params}/>
  }
}

export default TimelineSceneContainer
