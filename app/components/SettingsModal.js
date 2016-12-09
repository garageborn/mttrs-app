import React, { Component, PropTypes } from 'react'
import { Modal, View, Text, Image, ScrollView, TouchableHighlight } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import CloseButton from './CloseButton'
import styles from '../styles/SettingsModal'

const messages = defineMessages({
  settings: {
    id: 'menu.settings',
    defaultMessage: 'Settings ...'
  },

  modalSubTitle: {
    id: 'modal.subTitle',
    defaultMessage: 'Language & Country'
  },

  feedback: {
    id: 'footer.feedback',
    defaultMessage: 'Questions? Feedbacks? Let us know!'
  }
})

class SettingsModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired
  }

  static defaultProps = {
    animationType: 'slide'
  }

  render() {
    const { visible, close, animationType } = this.props
    const { formatMessage } = this.props.intl
    const subTitle = formatMessage(messages.modalSubTitle)
    return (
      <Modal
        visible={visible}
        animationType={animationType}
        onRequestClose={close}
        >
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Image source={require('../assets/icons/icon-settings.png')} />
              <Text style={styles.modalTitle}>{formatMessage(messages.settings)}</Text>
            </View>
            <View style={styles.options}>
              <Text style={styles.optionsSubTitle}>{subTitle.toUpperCase()}</Text>
              <ScrollView style={styles.optionsList}>
                <TouchableHighlight>
                  <View style={styles.optionItem}>
                    <Text style={styles.optionTitle}>English - USA/UK</Text>
                    <Image source={require('../assets/checkmark.png')} />
                  </View>
                </TouchableHighlight>
                <TouchableHighlight>
                  <View style={styles.optionItem}>
                    <Text style={styles.optionTitle}>Português - Brasil</Text>
                    <Image source={require('../assets/checkmark.png')} />
                  </View>
                </TouchableHighlight>
              </ScrollView>
            </View>
            <View style={styles.modalFooter}>
              <TouchableHighlight>
                <Text style={styles.modalFooterText}>{formatMessage(messages.feedback)}</Text>
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
