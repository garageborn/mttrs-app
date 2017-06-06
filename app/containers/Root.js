import React, { Component, PropTypes } from 'react'
import { StatusBar, Platform } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import EventsContainer from './EventsContainer'
import NavigationContainer from './NavigationContainer'
import ModalContainer from './ModalContainer'
import IntlProvider from '../config/IntlProvider'
import apolloClient from '../config/apolloClient'
import { STATUS_BAR_COLOR } from '../constants/Colors'
require('../config/Sentry')

class Root extends Component {
  constructor () {
    super()
    if (Platform.OS === 'ios') StatusBar.setBarStyle(STATUS_BAR_COLOR)
  }

  render () {
    const { store } = this.props

    return (
      <ApolloProvider store={store} client={apolloClient}>
        <IntlProvider>
          <EventsContainer>
            <ModalContainer />
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
