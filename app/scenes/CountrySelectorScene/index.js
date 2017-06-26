import React from 'react'
import CountrySelectorContainer from '../../containers/CountrySelectorContainer'
import HeaderLeft from '../../components/HeaderLeft'
import HeaderTitle from '../../components/HeaderTitle'
import headerStyles from '../../styles/Header'
import AnalyticsContainer from '../../containers/AnalyticsContainer'

const CountrySelectorScene = () => (
  <AnalyticsContainer scene={'countrySelector'} screenName={'/countrySelector'}>
    <CountrySelectorContainer />
  </AnalyticsContainer>
)

CountrySelectorScene.navigationOptions = props => {
  return {
    headerLeft: <HeaderLeft {...props} />,
    headerTitle: <HeaderTitle leftButton title={'Change Country'} />,
    ...headerStyles
  }
}

export default CountrySelectorScene
