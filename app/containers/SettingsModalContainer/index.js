import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SettingsModal from '../../components/SettingsModal'
import { TenantActions, NotificationsActions } from '../../actions/index'

class SettingsModalContainer extends Component {
  constructor (props) {
    super(props)
    this.changeTenant = this.changeTenant.bind(this)
    this.toggleTenantNotification = this.toggleTenantNotification.bind(this)
  }

  render () {
    const { close, tenant, visible, notificationsStatus } = this.props
    return (
      <SettingsModal
        close={close}
        changeTenant={this.changeTenant}
        toggleTenantNotification={this.toggleTenantNotification}
        tenant={tenant}
        visible={visible}
        notificationsStatus={notificationsStatus}
      />
    )
  }

  changeTenant (tenantId) {
    const { close, dispatch, tenant } = this.props
    if (tenant.id === tenantId) return close()

    close()

    dispatch(TenantActions.setCurrent(tenantId))
  }

  toggleTenantNotification (tenant, status) {
    return this.props.dispatch(NotificationsActions.setTenantNotificationStatus(tenant, status))
  }
}

SettingsModalContainer.propTypes = {
  close: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  tenant: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  notificationsStatus: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    tenant: state.TenantReducer.current,
    notificationsStatus: state.NotificationsReducer.status
  }
}

export default connect(mapStateToProps)(SettingsModalContainer)
