import React, { Component, PropTypes } from 'react'
import { Image, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import DialogButton from '../DialogButton'
import Touchable from '../Touchable'
import styles from './styles'

const tenantIcon = require('./assets/tenant.png')
const settingsIcon = require('./assets/settings.png')
const messages = defineMessages({
  mttrs_br: { id: 'settingsDialog.mttrs_br' },
  mttrs_us: { id: 'settingsDialog.mttrs_us' },
  settings: { id: 'settingsDialog.settings' }
})

const SettingsDialog = ({ intl, openSettings, setTenant, tenant }) => {
  const renderTenantButton = () => {
    const tenantId = tenant.id
    const label = intl.formatMessage(messages[tenantId])
    const icon = <Image source={tenantIcon} />

    return (
      <Touchable underlayColor={'rgba(255, 255, 255, .2)'} onPress={() => setTenant(tenantId)}>
        <View>
          <DialogButton icon={icon} messages={[label]} />
        </View>
      </Touchable>
    )
  }

  const renderSettingsButton = () => {
    const label = intl.formatMessage(messages.settings)
    const icon = <Image source={settingsIcon} />

    return (
      <Touchable underlayColor={'rgba(255, 255, 255, .2)'} onPress={openSettings}>
        <View>
          <DialogButton icon={icon} messages={[label]} />
        </View>
      </Touchable>
    )
  }

  return (
    <View style={styles.container}>
      {renderTenantButton()}
      {renderSettingsButton()}
    </View>
  )
}

SettingsDialog.propTypes = {
  tenant: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  setTenant: PropTypes.func.isRequired,
  openSettings: PropTypes.func.isRequired
}

export default injectIntl(SettingsDialog)
