import React from 'react'
import NotificationsSettingsList from '../../components/NotificationsSettingsList'
import HeaderLeft from '../../components/HeaderLeft'
import HeaderTitle from '../../components/HeaderTitle'
import headerStyles from '../../styles/Header'
import AnalyticsContainer from '../../containers/AnalyticsContainer'

const NotificationsSettingsScene = () => (
  <AnalyticsContainer scene={'notifications'} screenName={'/notifications'}>
    <NotificationsSettingsList />
  </AnalyticsContainer>
)

NotificationsSettingsScene.navigationOptions = props => {
  return {
    headerLeft: <HeaderLeft {...props} />,
    headerTitle: (
      <HeaderTitle
        leftButton
        title={props.screenProps.intl.formatMessage({ id: 'notifications.label' })}
      />
    ),
    ...headerStyles
  }
}

export default NotificationsSettingsScene
