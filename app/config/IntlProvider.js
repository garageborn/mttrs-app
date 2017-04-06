import React, { Component, PropTypes } from 'react'
import { NativeModules, Platform } from 'react-native'
import { IntlProvider, addLocaleData } from 'react-intl'
import intl from 'intl'
import { DEFAULT_LANGUAGE } from '../constants/Locale'
import * as translations from '../common/translations/i18n'
import localeData from 'react-intl/locale-data'
import androidLocaleData from 'intl/locale-data/complete'
import { connect } from 'react-redux'

Platform.select({
  ios: () => addLocaleData([...localeData]),
  android: () => {
    addLocaleData([...localeData, ...androidLocaleData])
    global.Intl = intl
  }
})()

class Provider extends Component {
  render () {
    const { tenant, children } = this.props
    const language = tenant.language || DEFAULT_LANGUAGE
    let messages = translations[language] || translations[DEFAULT_LANGUAGE]

    return (
      <IntlProvider locale={language} defaultLocale={DEFAULT_LANGUAGE} messages={messages}>
        {children}
      </IntlProvider>
    )
  }
}

Provider.propTypes = {
  children: PropTypes.any.isRequired,
  tenant: PropTypes.shape({
    language: PropTypes.string
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    tenant: state.TenantReducer.current
  }
}

export default connect(mapStateToProps)(Provider)
