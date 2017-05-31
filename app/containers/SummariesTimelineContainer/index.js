import React, { Component, PropTypes } from 'react'
import withQuery from './index.gql'
import TimelineContainer from '../TimelineContainer'

class SummariesTimelineContainer extends Component {
  render () {
    const renderOptions = { timelineType: 'summaries' }
    return <TimelineContainer data={this.props.data} renderOptions={renderOptions} />
  }
}

SummariesTimelineContainer.propTypes = {
  data: PropTypes.object
}

export default withQuery(SummariesTimelineContainer)
