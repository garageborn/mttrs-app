import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'
import _isEqual from 'lodash/isEqual'
import PopularSceneLoading from '../../components/PopularSceneLoading'
import withQuery from './index.gql'
import PopularNavigator from '../../navigators/PopularNavigator'
import { RoutesTrackingActions } from '../../actions/index'

class PopularScene extends Component {
  constructor () {
    super()
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this)
  }

  // shouldComponentUpdate (nextProps) {
  //   const loadingChanged = this.props.data.loading !== nextProps.data.loading
  //   const categoriesChanged = !_isEqual(this.props.data.categories, nextProps.data.categories)
  //   return loadingChanged || categoriesChanged
  // }

  componentDidUpdate () {
    const { dispatch } = this.props
    if (!PopularNavigator.initialRoute) return
    dispatch(RoutesTrackingActions.initPopular(PopularNavigator.initialRoute))
  }

  render () {
    const { categories, loading } = this.props.data
    if (loading) return this.renderLoading()
    PopularNavigator.setCategories(categories)
    return <PopularNavigator.component onNavigationStateChange={this.onNavigationStateChange} />
  }

  renderLoading () {
    return <PopularSceneLoading />
  }

  onNavigationStateChange (prevState, currentState) {
    const { dispatch } = this.props
    const currentRoute = prevState.routes[prevState.index]
    const nextRoute = currentState.routes[currentState.index]
    if (!_isEqual(currentRoute, nextRoute)) dispatch(RoutesTrackingActions.trackPopular(nextRoute))
  }
}

PopularScene.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    categories: PropTypes.array
  }).isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tenant: state.TenantReducer,
  popularNav: state.popularNav
})

PopularScene.navigationOptions = props => {
  return {
    headerMode: 'none'
  }
}

const PopularSceneWithData = withQuery(PopularScene)
export default connect(mapStateToProps)(PopularSceneWithData)
