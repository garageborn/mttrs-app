import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from '@exponent/ex-navigation'
import withQuery from './index.gql'
import { AnalyticsActions, NavigationActions } from '../../actions/index'
import Timeline from '../Timeline'
import BackButtonBehaviour from '../../common/utils/BackButtonBehaviour'
import _isEqual from 'lodash/isEqual'

class CategoryTimeline extends Component {
  constructor () {
    super()
    this.goHome = this.goHome.bind(this)
  }

  componentWillMount () {
    this.analyticsTrack()
  }

  shouldComponentUpdate (nextProps) {
    if (this.isActiveTimeline(nextProps)) return true
    let loadingChanged = this.props.data.loading !== nextProps.data.loading
    let hasMoreChanged = this.props.data.hasMore !== nextProps.data.hasMore
    if (loadingChanged || hasMoreChanged) return true
    return !_isEqual(this.props.data.items, nextProps.data.items)
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
    return this.props.isActiveRoute && this.isActiveTimeline(this.props) && !this.props.uiReducer.menu.isOpen
  }

  isActiveTimeline (props) {
    let currentRouteOnArray = props.navigationState.routes.find((item) =>
      item.model === props.model
    )
    console.log(props.navigationState.index)
    console.log(currentRouteOnArray.key)
    return JSON.parse(currentRouteOnArray.key) === props.navigationState.index
  }
}

CategoryTimeline.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.any,
  navigationState: PropTypes.shape({
    index: PropTypes.number.isRequired,
    routes: PropTypes.array.isRequired
  }).isRequired,
  isActiveRoute: PropTypes.bool,
  uiReducer: PropTypes.object.isRequired
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
