import React, { Component, PropTypes } from 'react'
import { Modal, View } from 'react-native'
import { connect } from 'react-redux'
import SettingsDialog from '../../components/SettingsDialog'
import Tenant from '../../common/utils/Tenant'
import { NavigationActions, TenantActions } from '../../actions/index'
import styles from '../../styles/Modal'

class SettingsDialogContainer extends Component {
  constructor () {
    super()
    this.openSettings = this.openSettings.bind(this)
    this.setTenant = this.setTenant.bind(this)
    this.close = this.close.bind(this)
  }

  render () {
    const { tenant } = this.props
    if (!tenant.isLoaded) return null

    return (
      <Modal transparent visible onRequestClose={this.close}>
        <View style={styles.modal}>
          <SettingsDialog
            tenant={this.alternativeTenant}
            openSettings={this.openSettings}
            setTenant={this.setTenant}
            />
        </View>
      </Modal>
    )
  }

  get alternativeTenant () {
    const { tenant } = this.props
    return Tenant.except(tenant.current.id)[0]
  }

  openSettings () {
    const { dispatch } = this.props
    this.close()
    dispatch(NavigationActions.settings())
  }

  setTenant (tenantId) {
    const { dispatch } = this.props
    this.close()
    dispatch(TenantActions.setCurrent(tenantId))
  }

  close () {
    const { dispatch } = this.props
    dispatch(NavigationActions.closeModal())
  }
}

SettingsDialogContainer.propTypes = {
  tenant: PropTypes.shape({
    current: PropTypes.shape({
      id: PropTypes.string
    }),
    isLoaded: PropTypes.bool.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    tenant: {
      isLoaded: state.TenantReducer.isLoaded,
      current: state.TenantReducer.current
    }
  }
}

export default connect(mapStateToProps)(SettingsDialogContainer)
