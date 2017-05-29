import React, { Component, PropTypes } from 'react'
import { Text, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import DeviceInfo from 'react-native-device-info'
import NotificationsSettingsContainer from '../../containers/NotificationsSettingsContainer'
import RateAppSettingsContainer from '../../containers/RateAppSettingsContainer'
import styles from './styles'

const appVersion = DeviceInfo.getReadableVersion()
const messages = defineMessages({
  version: { id: 'settings.version' }
})

class Settings extends Component {
  render () {
    const { intl } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.options}>
          <View style={styles.options}>
            <NotificationsSettingsContainer />
            <RateAppSettingsContainer />
            <Text>{intl.formatMessage(messages.version)} {appVersion}</Text>
          </View>
        </View>
      </View>
    )
  }
}

Settings.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(Settings)
