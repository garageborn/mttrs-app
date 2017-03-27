import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { StorageActions } from '../actions/index'
import Onboarding from '../components/Onboarding'
import { NavigationProvider, StackNavigation } from '@exponent/ex-navigation'
import Router from '../config/Router'

class AppContainer extends Component {
  constructor () {
    super()
    this.onOnboardingEnd = this.onOnboardingEnd.bind(this)
  }

  onOnboardingEnd () {
    this.props.dispatch(StorageActions.closeOnboarding())
  }

  render () {
    const { tenant, onboarding } = this.props.StorageReducer

    if (onboarding.isFetching) return null
    if (onboarding.show) return <Onboarding onEnd={this.onOnboardingEnd} />

    if (tenant.isFetching) return null

    return (
      <NavigationProvider context={this.props.navigationContext}>
        <StackNavigation initialRoute={Router.getRoute('timeline')} />
      </NavigationProvider>
    )
  }
}

AppContainer.propTypes = {
  navigationContext: PropTypes.object.isRequired,
  StorageReducer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

let mapStateToProps = (state) => {
  return {
    StorageReducer: state.StorageReducer
  }
}

export default connect(mapStateToProps)(AppContainer)
