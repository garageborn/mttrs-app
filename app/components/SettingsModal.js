import React, { Component, PropTypes } from 'react'
import { Modal, View, Text, Image, TouchableHighlight } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import CloseButton from './CloseButton'
import styles from '../styles/SettingsModal'

const messages = defineMessages({
  settings: {
    id: 'menu.settings',
    defaultMessage: 'Settings ...'
  }
})

class SettingsModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired
  }

  render() {
    const { visible, close } = this.props
    const { formatMessage } = this.props.intl
    return (
      <Modal
        visible={visible}
        animationType='slide'
        >
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Image source={require('../assets/icons/icon-settings.png')} />
              <Text style={styles.modalTitle}>{formatMessage(messages.settings)}</Text>
            </View>
            <View style={styles.options}>
              <View>
                <Text>English - USA/UK</Text>
              </View>
              <View>
                <Text>Português - Brasil</Text>
              </View>
            </View>
            <View style={styles.modalFooter}>
              <TouchableHighlight>
                <Text style={styles.modalFooterText}>Questions? Feedbacks? Let us know!</Text>
              </TouchableHighlight>
            </View>
          </View>
          <CloseButton onPress={close} />
        </View>
      </Modal>
    )
  }
}

export default injectIntl(SettingsModal)
