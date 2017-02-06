import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { StorageActions } from '../actions/index'
import Onboarding from '../components/Onboarding'
import { NavigationProvider, StackNavigation } from '@exponent/ex-navigation'
import Router from '../config/Router'

class AppContainer extends Component {
  onOnboardingEnd = () => {
    this.props.dispatch(StorageActions.closeOnboarding())
  }

  render () {
    const { isFetching, show } = this.props.StorageReducer.onboarding

    if (isFetching) return null
    if (show) return <Onboarding onEnd={this.onOnboardingEnd} />

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
