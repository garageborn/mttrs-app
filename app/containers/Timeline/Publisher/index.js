import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import { AnalyticsActions } from '../../../actions/index'
import TimelineControl from '../../../components/TimelineControl'

class PublisherTimeline extends Component {
  componentWillMount () {
    this.analyticsTrack()
  }

  analyticsTrack () {
    const { dispatch, model } = this.props
    dispatch(AnalyticsActions.trackScreen(`/${model.slug}`))
  }

  render () {
    return <TimelineControl data={this.props.data} />
  }
}

PublisherTimeline.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired
}

const PublisherTimelineWithData = withQuery(PublisherTimeline)
export default connect()(PublisherTimelineWithData)
