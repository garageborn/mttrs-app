import React from 'react'
import AnalyticsContainer from '../../containers/AnalyticsContainer'
import SummariesTimelineContainer from '../../containers/SummariesTimelineContainer'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
import headerStyles from '../../styles/Header'

const SummariesScene = () => (
  <AnalyticsContainer scene={'summaries'} screenName={'/summaries'}>
    <SummariesTimelineContainer />
  </AnalyticsContainer>
)

SummariesScene.navigationOptions = props => {
  return {
    headerTitle: props.screenProps.intl.formatMessage({id: 'header.summaries'}),
    headerRight: <HeaderSettingsContainer />,
    ...headerStyles
  }
}

export default SummariesScene
