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

class SettingsDialog extends Component {
  render () {
    return (
      <View style={styles.container}>
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
      <Touchable underlayColor={'rgba(255, 255, 255, .2)'} onPress={() => setTenant(tenantId)}>
        <View>
          <DialogButton icon={this.tenantIcon} messages={[label]} />
        </View>
      </Touchable>
    )
  }

  renderSettingsButton () {
    const { openSettings } = this.props
    const { formatMessage } = this.props.intl
    const label = formatMessage(messages.settings)

    return (
      <Touchable underlayColor={'rgba(255, 255, 255, .2)'} onPress={openSettings}>
        <View>
          <DialogButton icon={this.settingsIcon} messages={[label]} />
        </View>
      </Touchable>
    )
  }

  get settingsIcon () {
    return <Image source={settingsIcon} />
  }

  get tenantIcon () {
    return <Image source={tenantIcon} />
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
