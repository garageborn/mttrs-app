import React from 'react'
import { View } from 'react-native'
import SettingsDialogContainer from '../../containers/SettingsDialogContainer'
import SummariesTimelineContainer from '../../containers/SummariesTimelineContainer'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
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
    headerRight: <HeaderSettingsContainer />,
    ...headerStyles
  }
}

export default SummariesScene
