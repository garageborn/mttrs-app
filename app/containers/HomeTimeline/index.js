import React, { Component, PropTypes } from 'react'
import withQuery from './index.gql'
import TimelineContainer from '../TimelineContainer'

class HomeTimeline extends Component {
  shouldComponentUpdate (nextProps) {
    if (!this.props.data || !nextProps.data) return true
    if (this.props.data.loading !== nextProps.data.loading) return true
    return this.props.current
  }

  render () {
    return <TimelineContainer data={this.props.data} />
  }
}

HomeTimeline.propTypes = {
  data: PropTypes.object,
  current: PropTypes.bool.isRequired
}

const HomeTimelineWithData = withQuery(HomeTimeline)
export default HomeTimelineWithData
