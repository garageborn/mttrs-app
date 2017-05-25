import React, { Component } from 'react'
import { View } from 'react-native'
import SettingsDialogContainer from '../../containers/SettingsDialogContainer'
import SummariesTimelineContainer from '../../containers/SummariesTimelineContainer'

class SummariesScene extends Component {
  render () {
    return (
      <View>
        <SettingsDialogContainer />
        <SummariesTimelineContainer />
      </View>
    )
  }
}

export default SummariesScene
