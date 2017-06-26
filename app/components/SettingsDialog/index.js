import React, { PropTypes } from 'react'
import { Image, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import DialogButton from '../DialogButton'
import Touchable from '../Touchable'
import styles from './styles'

const tenantSelectorIcon = require('./assets/tenant.png')
const settingsIcon = require('./assets/settings.png')
const messages = defineMessages({
  changeCountry: { id: 'settingsDialog.changeCountry' },
  settings: { id: 'settingsDialog.settings' }
})

const SettingsDialog = ({ intl, openSettings, openTenantSelector, tenant }) => {
  const rendertenantSelectorButton = () => {
    const label = intl.formatMessage(messages.changeCountry)
    const icon = <Image source={tenantSelectorIcon} />

    return (
      <Touchable underlayColor={'rgba(255, 255, 255, .2)'} onPress={openTenantSelector}>
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
      {rendertenantSelectorButton()}
      {renderSettingsButton()}
    </View>
  )
}

SettingsDialog.propTypes = {
  tenant: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  openTenantSelector: PropTypes.func.isRequired,
  openSettings: PropTypes.func.isRequired
}

export default injectIntl(SettingsDialog)
