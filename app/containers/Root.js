import React, { Component, PropTypes } from 'react'
import { StatusBar, Platform } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import EventsContainer from './EventsContainer'
import NavigationContainer from './NavigationContainer'
import IntlProvider from '../config/IntlProvider'
import apolloClient from '../config/apolloClient'
require('../config/sentry')

class Root extends Component {
  constructor () {
    super()
    if (Platform.OS === 'ios') StatusBar.setBarStyle('light-content')
  }

  render () {
    const { store } = this.props

    return (
      <ApolloProvider store={store} client={apolloClient}>
        <IntlProvider>
          <EventsContainer>
            <NavigationContainer />
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
