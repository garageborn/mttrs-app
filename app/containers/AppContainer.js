import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { StorageActions } from '../actions/index'
import Onboarding from '../components/Onboarding'
import { NavigationProvider, StackNavigation } from '@exponent/ex-navigation'
import NotificationsContainer from './NotificationsContainer'
import Router from '../config/Router'

class AppContainer extends Component {
  constructor () {
    super()
    this.onOnboardingEnd = this.onOnboardingEnd.bind(this)
  }

  render () {
    const { tenant, onboarding } = this.props

    if (onboarding.isFetching) return null
    if (onboarding.show) return <Onboarding onEnd={this.onOnboardingEnd} />

    if (tenant.isFetching) return null

    return (
      <NotificationsContainer>
        <NavigationProvider context={this.props.navigationContext}>
          <StackNavigation initialRoute={Router.getRoute('timeline')} />
        </NavigationProvider>
      </NotificationsContainer>
    )
  }

  onOnboardingEnd () {
    this.props.dispatch(StorageActions.closeOnboarding())
  }
}

AppContainer.propTypes = {
  navigationContext: PropTypes.object.isRequired,
  tenant: PropTypes.object.isRequired,
  onboarding: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

let mapStateToProps = (state) => {
  return {
    tenant: state.StorageReducer.tenant,
    onboarding: state.StorageReducer.onboarding
  }
}

export default connect(mapStateToProps)(AppContainer)
