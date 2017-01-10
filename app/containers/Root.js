import React, { Component, PropTypes } from 'react'
import { StatusBar, Platform, NativeModules } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { IntlProvider, addLocaleData } from 'react-intl'
import { NavigationContext, NavigationProvider, StackNavigation, } from '@exponent/ex-navigation'
import { StorageActions } from '../actions/index'
import intl from 'intl'
import localeData from 'react-intl/locale-data'
import androidLocaleData from 'intl/locale-data/complete'
import Raven from 'raven-js'
import * as messages from '../common/translations/i18n'
import Router from '../config/Router'
import apolloClient from '../config/apolloClient'
require('raven-js/plugins/react-native')(Raven)

Platform.select({
  ios: addLocaleData([...localeData]),
  android: addLocaleData([...androidLocaleData])
})

if (Platform.OS === 'android') global.Intl = intl

const locale = new Intl.DateTimeFormat().resolvedOptions().locale
let language = locale.substr(0, 2)
const msg = messages[language] || messages.en

if (!__DEV__) {
  const DSN_KEY = 'https://5cdede7e751f4807b1113013db2d917b@sentry.io/87957'

  Raven
    .config(DSN_KEY, { release: '1.0' })
    .install()
}

class Root extends Component {
  componentWillMount() {
    this.props.store.dispatch(StorageActions.getCurrentTenant(locale))
  }
  render() {
    if (Platform.OS === 'ios') StatusBar.setBarStyle('light-content')

    const { store } = this.props
    const navigationContext = new NavigationContext({ router: Router, store: store })

    return (
      <IntlProvider locale={language} defaultLocale='en' messages={msg}>
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
