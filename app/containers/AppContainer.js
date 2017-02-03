import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { StorageActions } from '../actions/index'
import OnBoarding from '../components/OnBoarding'
import { NavigationProvider, StackNavigation } from '@exponent/ex-navigation'
import Router from '../config/Router'

class AppContainer extends Component {
  render () {
    const { StorageReducer } = this.props

    if (StorageReducer.onboarding.isFetching) return null
    if (StorageReducer.onboarding.showing) return <OnBoarding onEnd={() => this.props.dispatch(StorageActions.setOnboardingStorageStatus())} />

    return (
      <NavigationProvider context={this.props.navigationContext}>
        <StackNavigation initialRoute={Router.getRoute('timeline')} />
      </NavigationProvider>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    StorageReducer: state.StorageReducer
  }
}

export default connect(mapStateToProps)(AppContainer)
