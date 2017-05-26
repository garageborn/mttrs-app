import React, { Component } from 'react'
import { View } from 'react-native'
import SettingsDialogContainer from '../../containers/SettingsDialogContainer'
import SummariesTimelineContainer from '../../containers/SummariesTimelineContainer'
import HeaderSettingsButton from '../../components/HeaderSettingsButton'
import headerStyles from '../../styles/Header'

const SummariesScene = () => (
  <View>
    <SettingsDialogContainer />
    <SummariesTimelineContainer />
  </View>
)

SummariesScene.navigationOptions = props => {
  return {
    headerTitle: props.screenProps.intl.formatMessage({id: 'header.summaries'}),
    headerRight: <HeaderSettingsButton />,
    ...headerStyles
  }
}

export default SummariesScene
