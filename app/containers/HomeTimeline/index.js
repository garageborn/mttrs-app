import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import Timeline from '../Timeline'

class HomeTimeline extends Component {
  shouldComponentUpdate (nextProps) {
    if (!this.props.data || !nextProps.data) return true
    if (this.props.data.loading !== nextProps.data.loading) return true
    return this.props.current
  }

  render () {
    return <Timeline data={this.props.data} />
  }
}

HomeTimeline.propTypes = {
  data: PropTypes.object,
  current: PropTypes.bool.isRequired
}

const HomeTimelineWithData = withQuery(HomeTimeline)
export default connect()(HomeTimelineWithData)
