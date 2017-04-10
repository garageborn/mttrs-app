import React, { Component, PropTypes } from 'react'
import { StatusBar, Platform } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { NavigationContext } from '@exponent/ex-navigation'
import EventsContainer from './EventsContainer'
import NavigationContainer from './NavigationContainer'
import IntlProvider from '../config/IntlProvider'
import apolloClient from '../config/apolloClient'
import Router from '../config/Router'
require('../config/sentry')

class Root extends Component {
  constructor () {
    super()
    if (Platform.OS === 'ios') StatusBar.setBarStyle('light-content')
  }

  render () {
    const { store } = this.props
    const navigationContext = new NavigationContext({ router: Router, store: store })

    return (
      <ApolloProvider store={store} client={apolloClient}>
        <IntlProvider>
          <EventsContainer>
            <NavigationContainer navigationContext={navigationContext} />
          </EventsContainer>
        </IntlProvider>
      </ApolloProvider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
