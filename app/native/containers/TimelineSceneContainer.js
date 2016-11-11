import React, { Component } from 'react'
import { View } from 'react-native'
import TimelineHeaderContainer from './TimelineHeaderContainer'
import TimelineContainer from './TimelineContainer'
import styles from '../styles/App'
import { headerHeight } from '../styles/Header'

class TimelineSceneContainer extends Component {
  static route = {
    navigationBar: {
      renderTitle: (route) => <TimelineHeaderContainer params={route.params}/>,
      renderLeft: () => <View />,
      renderRight: () => <View />,
      backgroundColor: '#262C5B',
      height: headerHeight
   }
  }

  render() {
    const { route } = this.props
    return <TimelineContainer params={route.params} />

    return (
      <View style={styles.container}>
        {/*<TimelineHeaderContainer params={route.params} />*/}
        <TimelineContainer params={route.params} />
      </View>
    )
  }
}

export default TimelineSceneContainer
