import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import { AnalyticsActions, NavigationActions } from '../../../actions/index'
import TimelineControl from '../../../components/TimelineControl'
import BackButtonBehaviour from '../../../common/utils/BackButtonBehaviour'

class CategoryTimeline extends Component {
  constructor () {
    super()
    this.goHome = this.goHome.bind(this)
  }

  componentWillMount () {
    this.analyticsTrack()
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
      <BackButtonBehaviour isFocused={this.isFocused} onBackButtonPress={this.goHome} batata={this.props.model.slug}>
        <TimelineControl data={this.props.data} />
      </BackButtonBehaviour>
    )
  }

  get isFocused () {
    return this.isActiveTimeline && !this.props.uiReducer.menu.isOpen
  }

  get isActiveTimeline () {
    let currentRouteOnArray = this.props.navigationState.routes.find((item) =>
      item.model === this.props.model
    )
    return JSON.parse(currentRouteOnArray.key) === this.props.navigationState.index
  }
}

CategoryTimeline.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.any,
  params: PropTypes.any,
  navigationState: PropTypes.shape({
    index: PropTypes.number.isRequired,
    routes: PropTypes.array.isRequired
  }).isRequired
}

let mapStateToProps = state => {
  return {
    uiReducer: state.uiReducer
  }
}

const CategoryTimelineWithData = withQuery(CategoryTimeline)
export default connect(mapStateToProps)(CategoryTimelineWithData)
