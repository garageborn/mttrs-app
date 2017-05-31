import React, { Component, PropTypes } from 'react'
import { View, Text, Switch, Platform } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import _result from 'lodash/result'
import styles, { thumbTintColor, thumbTintActive, tintColor, onTintColor, smallTextColor } from './styles'
import Heading from '../Heading'
import { DARK_COLOR } from '../../constants/Colors'

const messages = defineMessages({
  mttrs_br: { id: 'notifications.mttrs_br' },
  mttrs_us: { id: 'notifications.mttrs_us' },
  notifications: { id: 'notifications.label' },
  enableNotifications: { id: 'enableNotifications' }
})

class NotificationsSettings extends Component {
  render () {
    const { formatMessage } = this.props.intl
    const notifications = formatMessage(messages.notifications)
    return (
      <View>
        <View style={styles.headingContainer}>
          <Heading size='regular' bold color={DARK_COLOR}>{notifications}</Heading>
        </View>
        <View style={styles.itemsContainer}>
          { this.renderNotificationStatus('mttrs_us') }
          { this.renderNotificationStatus('mttrs_br') }
        </View>
        { this.renderDisclaimer() }
      </View>
    )
  }

  renderDisclaimer () {
    const { formatMessage } = this.props.intl
    if (this.props.enabled) return null
    if (Platform.OS !== 'ios') return null
    return (
      <View style={styles.disclaimerContainer}>
        <Heading size='small' color={smallTextColor}>{formatMessage(messages.enableNotifications)}</Heading>
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

NotificationsSettings.propTypes = {
  toggleTenantNotification: PropTypes.func.isRequired,
  tags: PropTypes.object.isRequired,
  enabled: PropTypes.bool.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(NotificationsSettings)
