import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SettingsModal from '../../components/SettingsModal'
import { StorageActions, TenantActions } from '../../actions/index'

class SettingsModalContainer extends Component {
  constructor (props) {
    super(props)
    this.changeTenant = this.changeTenant.bind(this)
    this.toggleNotificationStatus = this.toggleNotificationStatus.bind(this)
  }

  render () {
    const { close, tenant, visible, notificationStatus } = this.props
    return (
      <SettingsModal
        close={close}
        changeTenant={this.changeTenant}
        toggleNotificationStatus={this.toggleNotificationStatus}
        tenant={tenant}
        visible={visible}
        notificationStatus={notificationStatus}
      />
    )
  }

  changeTenant (tenantId) {
    const { close, dispatch, tenant } = this.props
    if (tenant.id === tenantId) return close()

    close()
    dispatch(TenantActions.setCurrent(tenantId))
  }

  toggleNotificationStatus () {
    let { active } = this.props.notificationStatus
    return this.props.dispatch(StorageActions.setNotificationStatus(!active))
  }
}

SettingsModalContainer.propTypes = {
  close: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  tenant: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  notificationStatus: PropTypes.shape({
    active: PropTypes.bool.isRequired
  }),
  visible: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    tenant: state.TenantReducer,
    notificationStatus: state.StorageReducer.notificationStatus
  }
}

export default connect(mapStateToProps)(SettingsModalContainer)
