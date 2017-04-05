/* eslint-disable react/jsx-no-bind */
import React, { Component, PropTypes } from 'react'
import { Modal, View, Text, Image, ScrollView, Switch } from 'react-native'
import Touchable from './../Touchable'
import { injectIntl, defineMessages } from 'react-intl'
import { capitalize } from '../../common/utils/formatText'
import CloseButton from './../CloseButton'
import styles, { thumbTintColor, thumbTintActive, tintColor, onTintColor } from './styles'

const messages = defineMessages({
  feedback: { id: 'footer.feedback' },
  modalSubTitle: { id: 'modal.subTitle' },
  mttrs_br: { id: 'mttrs_br.label' },
  mttrs_us: { id: 'mttrs_us.label' },
  settings: { id: 'menu.settings' },
  notifications: { id: 'notifications' }
})

const checkmark = require('./assets/checkmark.png')

class SettingsModal extends Component {
  renderCheckmark (tenant) {
    if (this.props.tenant.id === tenant) return <Image source={checkmark} />
  }

  renderButton (tenantId) {
    const { changeTenant, intl } = this.props
    const tenantLabel = intl.formatMessage(messages[tenantId])

    return (
      <Touchable onPress={() => changeTenant(tenantId)}>
        <View style={styles.optionItem}>
          <Text style={styles.optionTitle}>{tenantLabel}</Text>
          {this.renderCheckmark(tenantId)}
        </View>
      </Touchable>
    )
  }

  render () {
    const { visible, close, animationType } = this.props
    const title = capitalize(this.props.intl.formatMessage(messages.settings))

    return (
      <Modal visible={visible} animationType={animationType} onRequestClose={close}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
            </View>
            { this.renderContent() }
          </View>
          <CloseButton onPress={close} />
        </View>
      </Modal>
    )
  }

  renderNotificationStatus (tenantId) {
    const { toggleNotificationStatus, notificationStatus, intl } = this.props
    const tenantLabel = intl.formatMessage(messages[tenantId])
    return (
      <View style={styles.optionItem}>
        <Text style={styles.optionTitle}>{tenantLabel}</Text>
        <Switch
          tintColor={tintColor}
          onTintColor={onTintColor}
          thumbTintColor={this.thumbTintColor}
          value={notificationStatus.active}
          onValueChange={toggleNotificationStatus}
        />
      </View>
    )
  }

  get thumbTintColor () {
    return this.props.notificationStatus.active ? thumbTintActive : thumbTintColor
  }

  renderContent () {
    const { formatMessage } = this.props.intl
    const subTitle = formatMessage(messages.modalSubTitle)
    const feedback = formatMessage(messages.feedback)
    const notifications = formatMessage(messages.notifications)

    return (
      <View style={styles.options}>
        <View style={styles.options}>
          <Text style={styles.optionsSubTitle}>{subTitle.toUpperCase()}</Text>
          <View style={styles.optionsList}>
            { this.renderButton('mttrs_us') }
            { this.renderButton('mttrs_br') }
          </View>
          <Text style={styles.optionsSubTitle}>{notifications}</Text>
          <View style={styles.optionsList}>
            { this.renderNotificationStatus('mttrs_us') }
            { this.renderNotificationStatus('mttrs_br') }
          </View>
        </View>
        <View style={styles.modalFooter}>
          <Touchable>
            <Text style={styles.modalFooterText}>{feedback}</Text>
          </Touchable>
        </View>
      </View>
    )
  }
}

SettingsModal.propTypes = {
  changeTenant: PropTypes.func.isRequired,
  toggleNotificationStatus: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  tenant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired
  }).isRequired,
  notificationStatus: PropTypes.shape({
    active: PropTypes.bool.isRequired
  }).isRequired,
  animationType: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  close: PropTypes.func.isRequired
}

SettingsModal.defaultProps = {
  animationType: 'slide'
}

export default injectIntl(SettingsModal)
