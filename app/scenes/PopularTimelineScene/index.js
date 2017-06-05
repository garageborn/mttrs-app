import React from 'react'
import PopularTimelineContainer from '../../containers/PopularTimelineContainer'
import AnalyticsContainer from '../../containers/AnalyticsContainer'

const PopularTimelineScene = ({ navigation }) => (
  <AnalyticsContainer scene={'home'} screenName={'/popular/home'}>
    <PopularTimelineContainer />
  </AnalyticsContainer>
)

export default PopularTimelineScene
