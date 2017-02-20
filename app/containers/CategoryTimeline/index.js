import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from '@exponent/ex-navigation'
import withQuery from './index.gql'
import { AnalyticsActions, NavigationActions } from '../../actions/index'
import Timeline from '../Timeline'
import BackButtonBehaviour from '../../common/utils/BackButtonBehaviour'

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
      <BackButtonBehaviour isFocused={this.isFocused} onBackButtonPress={this.goHome}>
        <Timeline data={this.props.data} />
      </BackButtonBehaviour>
    )
  }

  get isFocused () {
    return this.props.isActiveRoute && this.isActiveTimeline && !this.props.uiReducer.menu.isOpen
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
  navigationState: PropTypes.shape({
    index: PropTypes.number.isRequired,
    routes: PropTypes.array.isRequired
  }).isRequired
}

const mapStateToProps = (state, ownProps) => {
  const currentRoute = ownProps.navigator.getCurrentRoute()
  return {
    isActiveRoute: currentRoute.routeName === 'timeline',
    uiReducer: state.uiReducer
  }
}

const CategoryTimelineWithData = withQuery(CategoryTimeline)
const CategoryWithRedux = connect(mapStateToProps)(CategoryTimelineWithData)
export default withNavigation(CategoryWithRedux)
