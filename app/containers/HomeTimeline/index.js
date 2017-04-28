import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import Timeline from '../Timeline'

class HomeTimeline extends Component {
  shouldComponentUpdate (nextProps) {
    if (!this.props.data || !nextProps.data) return false
    if (this.props.data.loading !== nextProps.data.loading) return true
    return this.isActiveTimeline(nextProps)
  }

  isActiveTimeline (nextProps) {
    return nextProps.navigationState.index === 0
  }

  render () {
    return <Timeline data={this.props.data} />
  }
}

HomeTimeline.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.any,
  navigationState: PropTypes.shape({
    index: PropTypes.number.isRequired,
    routes: PropTypes.array.isRequired
  }).isRequired
}

const HomeTimelineWithData = withQuery(HomeTimeline)
export default connect()(HomeTimelineWithData)
