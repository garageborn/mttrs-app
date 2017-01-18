import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal, View, Text, Image, ScrollView, TouchableHighlight } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import { StorageActions } from '../actions/index'
import apolloClient from '../config/apolloClient'
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
    defaultMessage: 'Questions? Feedback? Let us know!'
  }
})

class SettingsModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tenant: this.props.StorageReducer.tenant.name
    }
  }

  onPressTenantButton (tenant) {
    this.setState({
      tenant
    })
  }

  onPressCloseButton () {
    if (this.state.tenant !== this.props.StorageReducer.tenant.name) {
      this.props.dispatch(StorageActions.setCurrentTenant(this.state.tenant))
      apolloClient.resetStore()
    }
    this.props.close()
  }

  renderCheckmark (tenant) {
    if (this.state.tenant === tenant) {
      return <Image source={require('../assets/checkmark.png')} />
    }
  }

  render () {
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
                <TouchableHighlight onPress={() => this.onPressTenantButton('mttrs_us')}>
                  <View style={styles.optionItem}>
                    <Text style={styles.optionTitle}>English - USA/UK</Text>
                    {this.renderCheckmark('mttrs_us')}
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.onPressTenantButton('mttrs_br')}>
                  <View style={styles.optionItem}>
                    <Text style={styles.optionTitle}>Português - Brasil</Text>
                    {this.renderCheckmark('mttrs_br')}
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
          <CloseButton onPress={() => this.onPressCloseButton()} />
        </View>
      </Modal>
    )
  }
}

SettingsModal.propTypes = {
  visible: PropTypes.bool.isRequired
}

SettingsModal.defaultProps = {
  animationType: 'slide'
}

const mapStateToProps = (state) => {
  return {
    StorageReducer: state.StorageReducer
  }
}

const intlSettingsModal = injectIntl(SettingsModal)
export default connect(mapStateToProps)(intlSettingsModal)
