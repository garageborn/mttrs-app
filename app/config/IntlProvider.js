import React, { Component, PropTypes } from 'react'
import { Platform } from 'react-native'
import { IntlProvider, addLocaleData } from 'react-intl'
import intl from 'intl'
import { NativeModules } from 'react-native'

import * as messages from '../common/translations/i18n'
import localeData from 'react-intl/locale-data'
import androidLocaleData from 'intl/locale-data/complete'

Platform.select({
  ios: addLocaleData([...localeData]),
  android: () => {
    addLocaleData([...androidLocaleData])
    global.Intl = intl
  }
})

export const locale = Platform.select({
  ios: () => NativeModules.SettingsManager.settings.AppleLocale,
  android: () => NativeModules.I18nManager.localeIdentifier
})()
export const language = locale.substr(0, 2)
export const timezone = new Intl.DateTimeFormat().resolvedOptions().timeZone

class Provider extends Component {
  render () {
    console.log('render provider')
    console.log('locale', locale)
    console.log('language', language)

    let msg = messages[language] || messages.en

    return (
      <IntlProvider locale={language} defaultLocale='en' messages={msg}>
        {this.props.children}
      </IntlProvider>
    )
  }
}

Provider.propTypes = {
  children: PropTypes.any.isRequired
}

export default Provider
