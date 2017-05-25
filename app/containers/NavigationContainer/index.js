import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'
import { TenantActions } from '../../actions/index'
import AppNavigator from '../../navigators/AppNavigator'

class NavigationContainer extends Component {
  componentWillMount () {
    this.props.dispatch(TenantActions.getCurrent())
  }

  render () {
    const { tenant } = this.props

    if (!tenant.isLoaded) return null

    return <AppNavigator navigation={this.getNavigationHelpers()} />
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

export default connect(mapStateToProps)(NavigationContainer)
