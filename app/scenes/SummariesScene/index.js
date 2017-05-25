import React, { Component } from 'react'
import { View } from 'react-native'
import SettingsDialogContainer from '../../containers/SettingsDialogContainer'
import SummariesTimelineContainer from '../../containers/SummariesTimelineContainer'
import HeaderRight from '../../components/HeaderRight'
import headerStyles from '../../styles/Header'

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

SummariesScene.navigationOptions = props => {
  return {
    headerTitle: props.screenProps.intl.formatMessage({id: 'header.summaries'}),
    headerRight: <HeaderRight />,
    ...headerStyles
  }
}

export default SummariesScene
