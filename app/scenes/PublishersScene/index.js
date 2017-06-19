import React from 'react'
import PublishersContainer from '../../containers/PublishersContainer'
import HeaderTitle from '../../components/HeaderTitle'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
import AnalyticsContainer from '../../containers/AnalyticsContainer'
import headerStyles from '../../styles/Header'

const PublishersScene = () => (
  <AnalyticsContainer scene={'publishers'} screenName={'/publishers'}>
    <PublishersContainer />
  </AnalyticsContainer>
)

PublishersScene.navigationOptions = props => {
  return {
    headerTitle: <HeaderTitle title={props.screenProps.intl.formatMessage({id: 'header.publishers'})} />,
    headerRight: <HeaderSettingsContainer />,
    ...headerStyles
  }
}

export default PublishersScene
