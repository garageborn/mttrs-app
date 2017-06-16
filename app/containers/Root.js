import React, { Component, PropTypes } from 'react'
import { StatusBar, Platform } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import SplashScreen from 'react-native-splash-screen'
import SafariView from 'react-native-safari-view'

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
    this.resetStatusBar = this.resetStatusBar.bind(this)
    this.changeStatusBar = this.changeStatusBar.bind(this)
    this.resetStatusBar()
  }

  componentDidMount () {
    SplashScreen.hide()
    this.safariViewShowListener = SafariView.addEventListener('onShow', this.changeStatusBar)
    this.safariViewDismissListener = SafariView.addEventListener('onDismiss', this.resetStatusBar)
  }

  componentWillUnmount () {
    if (this.safariViewShowListener) {
      SafariView.removeEventListener('onShow', this.safariViewShowSubscription)
    }
    if (this.safariViewDismissListener) {
      SafariView.removeEventListener('onDismiss', this.safariViewShowSubscription)
    }
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

  changeStatusBar () {
    if (Platform.OS === 'ios') StatusBar.setBarStyle('default')
  }

  resetStatusBar () {
    if (Platform.OS === 'ios') StatusBar.setBarStyle(STATUS_BAR_COLOR)
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
