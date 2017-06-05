import React, { Component, PropTypes } from 'react'
import withQuery from './index.gql'
import TimelineContainer from '../TimelineContainer'
import updateCurrentScene from '../../common/utils/updateCurrentScene'

class SummariesTimelineContainer extends Component {
  constructor () {
    super()
    updateCurrentScene(this, 'summaries')
  }

  render () {
    const renderOptions = { timelineType: 'summaries' }
    return <TimelineContainer data={this.props.data} renderOptions={renderOptions} />
  }
}

SummariesTimelineContainer.propTypes = {
  data: PropTypes.object
}

export default withQuery(SummariesTimelineContainer)
