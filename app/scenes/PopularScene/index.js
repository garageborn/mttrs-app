import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'
import _isEqual from 'lodash/isEqual'
import withQuery from './index.gql'
import PopularNavigator from '../../navigators/PopularNavigator'
import { RoutesTrackingActions } from '../../actions/index'

class PopularScene extends Component {
  constructor () {
    super()
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    const loadingChanged = this.props.data.loading !== nextProps.data.loading
    const categoriesChanged = !_isEqual(this.props.data.categories, nextProps.data.categories)
    return loadingChanged || categoriesChanged
  }

  render () {
    if (this.props.data.loading) return this.renderLoading()
    const Navigator = PopularNavigator(this.props.data.categories)
    return <Navigator onNavigationStateChange={this.onNavigationStateChange} />
  }

  renderLoading () {
    return (
      <View>
        <ActivityIndicator size='small' color='#AAA' />
      </View>
    )
  }

  onNavigationStateChange (prevState, currentState) {
    console.log('onNavigationStateChange', currentState)
    const { dispatch } = this.props
    const currentRoute = prevState.routes[prevState.index]
    const nextRoute = currentState.routes[currentState.index]
    if (!_isEqual(currentRoute, nextRoute)) dispatch(RoutesTrackingActions.track(nextRoute))
  }
}

PopularScene.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    categories: PropTypes.array
  }).isRequired,
  dispatch: PropTypes.func.isRequired
}

PopularScene.navigationOptions = props => {
  return {
    headerMode: 'none'
  }
}

const PopularSceneWithData = withQuery(PopularScene)
export default connect()(PopularSceneWithData)
