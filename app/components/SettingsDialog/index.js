import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import DialogButton from '../DialogButton'
import Touchable from '../Touchable'

const shareIcon = require('../StoryDialog/assets/share.png')
const messages = defineMessages({
  mttrs_br: { id: 'settingsDialog.mttrs_br' },
  mttrs_us: { id: 'settingsDialog.mttrs_us' },
  settings: { id: 'settingsDialog.settings' }
})

class SettingsDialog extends Component {
  render () {
    return (
      <View>
        {this.renderSettingsButton()}
        {this.renderTenantButton()}
      </View>
    )
  }

  renderTenantButton () {
    const { intl, setTenant, tenant } = this.props
    const tenantId = tenant.id
    const label = intl.formatMessage(messages[tenantId])

    return (
      <Touchable onPress={() => setTenant(tenantId)}>
        <View>
          <DialogButton icon={shareIcon} messages={[label]} />
        </View>
      </Touchable>
    )
  }

  renderSettingsButton () {
    const { openSettings } = this.props
    const { formatMessage } = this.props.intl
    const label = formatMessage(messages.settings)

    return (
      <Touchable onPress={openSettings}>
        <View>
          <DialogButton icon={shareIcon} messages={[label]} />
        </View>
      </Touchable>
    )
  }
}

SettingsDialog.propTypes = {
  tenant: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  setTenant: PropTypes.func.isRequired,
  openSettings: PropTypes.func.isRequired
}

export default injectIntl(SettingsDialog)
