import React, { Component, PropTypes } from 'react'
import { Platform } from 'react-native'
import { IntlProvider, addLocaleData } from 'react-intl'
import intl from 'intl'

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

export const locale = new Intl.DateTimeFormat().resolvedOptions().locale
export const timezone = new Intl.DateTimeFormat().resolvedOptions().timeZone

class Provider extends Component {
  render () {
    let language = locale.substr(0, 2)
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
