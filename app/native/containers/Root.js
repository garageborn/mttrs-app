import React, { Component, PropTypes } from 'react'
import { ApolloProvider } from 'react-apollo'
import { StatusBar, Platform } from 'react-native'
import { NavigationContext, NavigationProvider, StackNavigation, } from '@exponent/ex-navigation'
import Router from '../config/Router'
import apolloClient from '../config/apolloClient'

class Root extends Component {
  render() {
    if (Platform.OS === 'ios') StatusBar.setBarStyle('default')

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
