import React from 'react'
import TenantSelectorContainer from '../../containers/TenantSelectorContainer'
import HeaderLeft from '../../components/HeaderLeft'
import HeaderTitle from '../../components/HeaderTitle'
import headerStyles from '../../styles/Header'
import AnalyticsContainer from '../../containers/AnalyticsContainer'

const TenantSelectorScene = () => (
  <AnalyticsContainer scene={'tenantSelector'} screenName={'/tenantSelector'}>
    <TenantSelectorContainer />
  </AnalyticsContainer>
)

TenantSelectorScene.navigationOptions = props => {
  return {
    headerLeft: <HeaderLeft {...props} />,
    headerTitle: <HeaderTitle leftButton title={'Change Country'} />,
    ...headerStyles
  }
}

export default TenantSelectorScene
