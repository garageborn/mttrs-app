import React, { Component, PropTypes } from 'react'
import { BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'
import { injectIntl } from 'react-intl'
import _isEqual from 'lodash/isEqual'
import { NavigationActions, TenantActions } from '../../actions/index'
import AppNavigator from '../../navigators/AppNavigator'

class NavigationContainer extends Component {
  constructor () {
    super()
    this.onBackPress = this.onBackPress.bind(this)
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillMount () {
    this.props.dispatch(TenantActions.getCurrent())
  }

  shouldComponentUpdate (nextProps) {
    return !_isEqual(this.props.tenant, nextProps.tenant)
  }

  render () {
    const { tenant, intl } = this.props

    if (!tenant.isLoaded) return null

    return (
      <AppNavigator
        screenProps={{ intl }}
        navigation={this.getNavigationHelpers()}
      />
    )
  }

  getNavigationHelpers () {
    return addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav
    })
  }

  onBackPress () {
    const { dispatch, nav } = this.props
    if (nav.index === 0) return false
    dispatch(NavigationActions.back())
    return true
  }
}

NavigationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tenant: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  tenant: state.TenantReducer,
  nav: state.nav
})

const NavigationContainerWithData = connect(mapStateToProps)(NavigationContainer)

export default injectIntl(NavigationContainerWithData)
