import React from 'react'
import PopularTimelineContainer from '../../containers/PopularTimelineContainer'
import AnalyticsContainer from '../../containers/AnalyticsContainer'

const PopularTimelineScene = ({ navigation }) => (
  <AnalyticsContainer screenName={'/popular'} >
    <PopularTimelineContainer />
  </AnalyticsContainer>
)

export default PopularTimelineScene
