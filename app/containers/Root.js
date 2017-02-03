/* eslint-disable react/jsx-no-bind */
import React, { Component, PropTypes } from 'react'
import { StatusBar, Platform } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { NavigationContext } from '@exponent/ex-navigation'
import OnBoarding from '../components/OnBoarding'
import AppContainer from './AppContainer'
import IntlProvider, { locale } from '../config/IntlProvider'
import { StorageActions } from '../actions/index'
import apolloClient from '../config/apolloClient'
import Router from '../config/Router'
require('../config/sentry')

class Root extends Component {
  state = {
    foo: true
  }

  componentWillMount () {
    this.props.store.dispatch(StorageActions.getOnboardingStatus())
    this.props.store.dispatch(StorageActions.getCurrentTenant(locale))
  }

  onBoarding () {
    return <OnBoarding onEnd={() => this.setState({foo: false})} />
  }

  render () {
    if (Platform.OS === 'ios') StatusBar.setBarStyle('light-content')

    const { store } = this.props
    // if (store.getState().StorageReducer.onboarding.isFetching) return null
    // if (store.getState().StorageReducer.onboarding.showing) return this.onBoarding()
    const navigationContext = new NavigationContext({ router: Router, store: store })

    return (
      <IntlProvider>
        <ApolloProvider store={store} client={apolloClient}>
          <AppContainer navigationContext={navigationContext}/>
        </ApolloProvider>
      </IntlProvider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
