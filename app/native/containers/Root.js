import React, { Component, PropTypes } from 'react'
import { StatusBar, Platform, NativeModules } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { IntlProvider, addLocaleData } from 'react-intl'
import { NavigationContext, NavigationProvider, StackNavigation, } from '@exponent/ex-navigation'
import en from 'react-intl/locale-data/en'
import pt from 'react-intl/locale-data/pt'
import Raven from 'raven-js'
import Router from '../config/Router'
import apolloClient from '../config/apolloClient'
require('raven-js/plugins/react-native')(Raven)

addLocaleData([...en, ...pt])

const locale = new Intl.DateTimeFormat().resolvedOptions().locale

if (!__DEV__) {
  const DSN_KEY = 'https://5cdede7e751f4807b1113013db2d917b@sentry.io/87957'

  Raven
    .config(DSN_KEY, { release: '1.0' })
    .install()
}

class Root extends Component {
  render() {
    if (Platform.OS === 'ios') StatusBar.setBarStyle('light-content')

    const { store } = this.props
    const navigationContext = new NavigationContext({ router: Router, store: store })

    return (
      <IntlProvider locale={locale}>
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
