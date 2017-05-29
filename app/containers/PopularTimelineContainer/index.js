import React, { PropTypes } from 'react'
import withQuery from './index.gql'
import TimelineContainer from '../TimelineContainer'

const PopularTimelineContainer = ({data}) => (
  <TimelineContainer data={data} />
)

PopularTimelineContainer.propTypes = {
  data: PropTypes.object
}

const PopularTimelineContainerWithData = withQuery(PopularTimelineContainer)
export default PopularTimelineContainerWithData
