/* eslint-disable react/jsx-no-bind */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal, View, Text, Image, ScrollView } from 'react-native'
import Touchable from './Touchable'
import { injectIntl, defineMessages } from 'react-intl'
import { StorageActions } from '../actions/index'
import { capitalize } from '../common/utils/formatText'
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
    id: 'footer.feedback'
  }
})

class SettingsModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tenant: this.props.tenantName
    }
  }

  onPressTenantButton (tenant) {
    this.setState({
      tenant
    })
  }

  onPressCloseButton () {
    if (this.state.tenant !== this.props.tenantName) {
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
    const { visible, close, animationType, getTenantName } = this.props
    const { formatMessage } = this.props.intl
    const subTitle = formatMessage(messages.modalSubTitle)
    const title = capitalize(formatMessage(messages.settings))
    return (
      <Modal
        visible={visible}
        animationType={animationType}
        onRequestClose={close}
      >
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
            </View>
            <View style={styles.options}>
              <Text style={styles.optionsSubTitle}>{subTitle.toUpperCase()}</Text>
              <ScrollView style={styles.optionsList}>
                <Touchable onPress={() => this.onPressTenantButton('mttrs_us')}>
                  <View style={styles.optionItem}>
                    <Text style={styles.optionTitle}>{getTenantName('mttrs_us')}</Text>
                    {this.renderCheckmark('mttrs_us')}
                  </View>
                </Touchable>
                <Touchable onPress={() => this.onPressTenantButton('mttrs_br')}>
                  <View style={styles.optionItem}>
                    <Text style={styles.optionTitle}>{getTenantName('mttrs_br')}</Text>
                    {this.renderCheckmark('mttrs_br')}
                  </View>
                </Touchable>
              </ScrollView>
            </View>
            <View style={styles.modalFooter}>
              <Touchable>
                <Text style={styles.modalFooterText}>{formatMessage(messages.feedback)}</Text>
              </Touchable>
            </View>
          </View>
          <CloseButton onPress={() => this.onPressCloseButton()} />
        </View>
      </Modal>
    )
  }
}

SettingsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  tenantName: PropTypes.string.isRequired,
  animationType: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  close: PropTypes.func.isRequired,
  getTenantName: PropTypes.func.isRequiredx
}

SettingsModal.defaultProps = {
  animationType: 'slide'
}

const mapStateToProps = (state) => {
  return {
    tenantName: state.StorageReducer.tenant.name
  }
}

const intlSettingsModal = injectIntl(SettingsModal)
export default connect(mapStateToProps)(intlSettingsModal)
