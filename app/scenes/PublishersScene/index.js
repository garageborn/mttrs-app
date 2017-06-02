import React from 'react'
import PublisherSelectorContainer from '../../containers/PublisherSelectorContainer'
import AnalyticsContainer from '../../containers/AnalyticsContainer'

const PublishersScene = () => (
  <AnalyticsContainer scene={'publishers'} screenName={'/publishers'}>
    <PublisherSelectorContainer />
  </AnalyticsContainer>
)

export default PublishersScene
