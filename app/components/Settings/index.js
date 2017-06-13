import React, { PropTypes } from 'react'
import { View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import DeviceInfo from 'react-native-device-info'
import NotificationsSettingsContainer from '../../containers/NotificationsSettingsContainer'
import Heading from '../Heading'
import RateAppSettingsContainer from '../../containers/RateAppSettingsContainer'
import styles, { smallTextColor } from './styles'

const appVersion = DeviceInfo.getVersion()
const messages = defineMessages({
  version: { id: 'settings.version' }
})

const Settings = ({ intl }) => (
  <View style={styles.container}>
    <NotificationsSettingsContainer />
    <RateAppSettingsContainer />
    <View style={styles.footerContainer}>
      <Heading size='small' color={smallTextColor}>
        {intl.formatMessage(messages.version)} {appVersion}
      </Heading>
    </View>
  </View>
)

Settings.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(Settings)
