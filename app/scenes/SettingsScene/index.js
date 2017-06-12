import React from 'react'
import Settings from '../../components/Settings'
import HeaderLeft from '../../components/HeaderLeft'
import HeaderTitle from '../../components/HeaderTitle'
import headerStyles from '../../styles/Header'
import AnalyticsContainer from '../../containers/AnalyticsContainer'

const SettingsScene = () => (
  <AnalyticsContainer scene={'settings'} screenName={'/settings'}>
    <Settings />
  </AnalyticsContainer>
)

SettingsScene.navigationOptions = props => {
  return {
    headerLeft: <HeaderLeft {...props} />,
    headerTitle: <HeaderTitle leftButton title={props.screenProps.intl.formatMessage({id: 'header.settings'})} />,
    ...headerStyles
  }
}

export default SettingsScene
