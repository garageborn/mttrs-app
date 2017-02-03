/* eslint-disable react/jsx-no-bind */
import React, { Component, PropTypes } from 'react'
import { StatusBar, Platform } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { NavigationContext, NavigationProvider, StackNavigation } from '@exponent/ex-navigation'
import OnBoarding from '../components/OnBoarding'
import IntlProvider, { locale } from '../config/IntlProvider'
import { StorageActions } from '../actions/index'
import Router from '../config/Router'
import apolloClient from '../config/apolloClient'
require('../config/sentry')

class Root extends Component {
  state = {
    foo: true
  }

  componentWillMount () {
    this.props.store.dispatch(StorageActions.getCurrentTenant(locale))
  }

  onBoarding () {
    return <OnBoarding onEnd={() => this.setState({foo: false})} />
  }

  render () {
    if (Platform.OS === 'ios') StatusBar.setBarStyle('light-content')

    const { store } = this.props
    const navigationContext = new NavigationContext({ router: Router, store: store })

    if (this.state.foo) return this.onBoarding()

    return (
      <IntlProvider>
        <ApolloProvider store={store} client={apolloClient}>
          <NavigationProvider context={navigationContext}>
            <StackNavigation initialRoute={Router.getRoute('timeline')} />
          </NavigationProvider>
        </ApolloProvider>
      </IntlProvider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
