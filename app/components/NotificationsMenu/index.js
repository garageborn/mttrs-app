/* eslint-disable react/jsx-no-bind */
import React, { Component, PropTypes } from 'react'
import { View, Text, Switch, Platform } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import _result from 'lodash/result'
import styles, { thumbTintColor, thumbTintActive, tintColor, onTintColor } from './styles'

const messages = defineMessages({
  mttrs_br: { id: 'mttrs_br.label' },
  mttrs_us: { id: 'mttrs_us.label' },
  notifications: { id: 'notifications' },
  enableNotifications: { id: 'enableNotifications' }
})

class NotificationsMenu extends Component {
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
        { this.renderDisclaimer()}
      </View>
    )
  }

  renderDisclaimer () {
    const { formatMessage } = this.props.intl
    if (this.props.enabled) return null
    if (Platform.OS !== 'ios') return null
    return (
      <View style={styles.disclaimerContainer}>
        <Text style={styles.disclaimerText}>{formatMessage(messages.enableNotifications)}</Text>
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
    let { tags } = this.props
    return _result(tags, tenantId) === 'true'
  }

  thumbTintColor (tenantId) {
    return this.isEnabled(tenantId) ? thumbTintActive : thumbTintColor
  }
}

NotificationsMenu.propTypes = {
  toggleTenantNotification: PropTypes.func.isRequired,
  tags: PropTypes.object.isRequired,
  enabled: PropTypes.bool.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(NotificationsMenu)
