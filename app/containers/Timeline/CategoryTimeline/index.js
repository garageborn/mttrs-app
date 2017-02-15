import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import { AnalyticsActions, NavigationActions } from '../../../actions/index'
import TimelineControl from '../../../components/TimelineControl'
import { AndroidBackButtonBehavior } from '@exponent/ex-navigation'

class CategoryTimeline extends Component {
  constructor () {
    super()
    this.goHome = this.goHome.bind(this)
  }
  componentWillMount () {
    this.analyticsTrack()
  }

  // shouldComponentUpdate (nextProps) {
  //   if (this.props.data.loading !== nextProps.data.loading) return true
  //   return this.isActiveTimeline(nextProps)
  // }

  isActiveTimeline (props) {
    let currentRouteOnArray = props.navigationState.routes.find((item) =>
      item.model === this.props.model
    )
    return JSON.parse(currentRouteOnArray.key) === props.navigationState.index
  }

  analyticsTrack () {
    const { dispatch, model } = this.props
    dispatch(AnalyticsActions.trackScreen(`/${model.slug}`))
  }

  goHome () {
    return Promise.resolve(this.props.dispatch(NavigationActions.home()))
  }

  render () {
    return (
      <AndroidBackButtonBehavior
        isFocused={this.isActiveTimeline(this.props)}
        onBackButtonPress={this.goHome}
      >
        <TimelineControl data={this.props.data} />
      </AndroidBackButtonBehavior>
    )
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
