/* eslint-disable react/jsx-no-bind */
import React, { Component, PropTypes } from 'react'
import { View, Text, Switch } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import _isEmpty from 'lodash/isEmpty'
import styles, { thumbTintColor, thumbTintActive, tintColor, onTintColor } from './styles'

const messages = defineMessages({
  mttrs_br: { id: 'mttrs_br.label' },
  mttrs_us: { id: 'mttrs_us.label' },
  notifications: { id: 'notifications' }
})

class SettingsModal extends Component {
  render () {
    const { formatMessage } = this.props.intl
    const notifications = formatMessage(messages.notifications)
    return (
      <View>
        <Text style={styles.title}>{notifications}</Text>
        <View>
          { this.renderNotificationStatus('mttrs_us') }
          { this.renderNotificationStatus('mttrs_br') }
        </View>
      </View>
    )
  }

  renderNotificationStatus (tenantId) {
    const { toggleTenantNotification, intl } = this.props
    const tenantLabel = intl.formatMessage(messages[tenantId])
    return (
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{tenantLabel}</Text>
        <Switch
          tintColor={tintColor}
          onTintColor={onTintColor}
          thumbTintColor={this.thumbTintColor(tenantId)}
          value={this.isEnabled(tenantId)}
          onValueChange={() => toggleTenantNotification(tenantId, !this.isEnabled(tenantId))}
        />
      </View>
    )
  }

  isEnabled (tenantId) {
    let { notificationsStatus } = this.props
    if (_isEmpty(notificationsStatus)) return false
    if (!notificationsStatus[tenantId]) return false
    return JSON.parse(notificationsStatus[tenantId])
  }

  thumbTintColor (tenantId) {
    return this.isEnabled(tenantId) ? thumbTintActive : thumbTintColor
  }
}

SettingsModal.propTypes = {
  toggleTenantNotification: PropTypes.func.isRequired,
  notificationsStatus: PropTypes.object.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(SettingsModal)
