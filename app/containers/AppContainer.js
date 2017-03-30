import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { StorageActions, NotificationsActions } from '../actions/index'
import Onboarding from '../components/Onboarding'
import { NavigationProvider, StackNavigation } from '@exponent/ex-navigation'
import Router from '../config/Router'

class AppContainer extends Component {
  constructor () {
    super()
    this.onOnboardingEnd = this.onOnboardingEnd.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.handleNotificationPermissions(nextProps)
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

  handleNotificationPermissions (nextProps) {
    if (nextProps.StorageReducer.visitedStories.items.length < 3) return
    if (nextProps.StorageReducer.visitedStories.items.length === this.props.StorageReducer.visitedStories.items.length) return
    return this.props.dispatch(NotificationsActions.requestPermissions())
  }

  onOnboardingEnd () {
    this.props.dispatch(StorageActions.closeOnboarding())
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
