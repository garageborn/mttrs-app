import React, { Component, PropTypes } from 'react'
import { StatusBar, Platform } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { NavigationContext } from '@exponent/ex-navigation'
import AppContainer from './AppContainer'
import IntlProvider, { locale } from '../config/IntlProvider'
import { StorageActions } from '../actions/index'
import apolloClient from '../config/apolloClient'
import Router from '../config/Router'
require('../config/sentry')

class Root extends Component {
  constructor () {
    super()
    if (Platform.OS === 'ios') StatusBar.setBarStyle('light-content')
  }

  componentWillMount () {
    this.props.store.dispatch(StorageActions.getOnboardingStatus())
    this.props.store.dispatch(StorageActions.getCurrentTenant(locale))
  }

  render () {
    const { store } = this.props
    const navigationContext = new NavigationContext({ router: Router, store: store })

    return (
      <IntlProvider>
        <ApolloProvider store={store} client={apolloClient}>
          <AppContainer navigationContext={navigationContext} />
        </ApolloProvider>
      </IntlProvider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
