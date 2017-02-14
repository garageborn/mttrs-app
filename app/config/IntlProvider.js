import React, { Component, PropTypes } from 'react'
import { NativeModules, Platform } from 'react-native'
import { IntlProvider, addLocaleData } from 'react-intl'
import intl from 'intl'
import * as messages from '../common/translations/i18n'
import localeData from 'react-intl/locale-data'
import androidLocaleData from 'intl/locale-data/complete'
import moment from 'moment-timezone'

Platform.select({
  ios: () => addLocaleData([...localeData]),
  android: () => {
    addLocaleData([...localeData, ...androidLocaleData])
    global.Intl = intl
  }
})()

export const locale = Platform.select({
  ios: () => NativeModules.SettingsManager.settings.AppleLocale,
  android: () => NativeModules.I18nManager.localeIdentifier
})()
export const language = locale.substr(0, 2)
export const timezone = moment.tz.guess()

class Provider extends Component {
  render () {
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
