import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import { AnalyticsActions } from '../../../actions/index'
import TimelineControl from '../../../components/TimelineControl'

class CategoryTimeline extends Component {
  componentWillMount () {
    this.analyticsTrack()
  }

  shouldComponentUpdate (nextProps) {
    if (this.props.data.loading !== nextProps.data.loading) return true
    return this.isActiveTimeline(nextProps)
  }

  isActiveTimeline (nextProps) {
    let currentRouteOnArray = nextProps.navigationState.routes.find((item) =>
      item.model === this.props.model
    )
    return JSON.parse(currentRouteOnArray.key) === nextProps.navigationState.index
  }

  analyticsTrack () {
    const { dispatch, model } = this.props
    dispatch(AnalyticsActions.trackScreen(`/${model.slug}`))
  }

  render () {
    return <TimelineControl data={this.props.data} />
  }
}

CategoryTimeline.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.any,
  navigationState: PropTypes.shape({
    index: PropTypes.number.isRequired,
    routes: PropTypes.array.isRequired
  }).isRequired
}

const CategoryTimelineWithData = withQuery(CategoryTimeline)
export default connect()(CategoryTimelineWithData)
