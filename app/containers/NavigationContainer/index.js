import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'
import { injectIntl } from 'react-intl'
import { TenantActions } from '../../actions/index'
import AppNavigator from '../../navigators/AppNavigator'

class NavigationContainer extends Component {
  componentWillMount () {
    this.props.dispatch(TenantActions.getCurrent())
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
