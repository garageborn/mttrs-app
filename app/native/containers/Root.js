import React, { Component, PropTypes } from 'react'
import { ApolloProvider } from 'react-apollo'
import { StatusBar, Platform } from 'react-native'
import Raven from 'raven-js'
import Config from 'react-native-config'
import { NavigationContext, NavigationProvider, StackNavigation, } from '@exponent/ex-navigation'
import Router from '../config/Router'
import apolloClient from '../config/apolloClient'
require('raven-js/plugins/react-native')(Raven)

if (!__DEV__) {
  Raven
    .config(Config.DSN_KEY, { release: '1.0' })
    .install()
}

class Root extends Component {
  render() {
    if (Platform.OS === 'ios') StatusBar.setBarStyle('light-content')

    const { store } = this.props
    const navigationContext = new NavigationContext({ router: Router, store: store })

    return (
      <ApolloProvider store={store} client={apolloClient}>
        <NavigationProvider context={navigationContext}>
          <StackNavigation initialRoute={Router.getRoute('timeline')} />
        </NavigationProvider>
      </ApolloProvider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
