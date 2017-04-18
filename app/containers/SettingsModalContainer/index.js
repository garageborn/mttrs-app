import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SettingsModal from '../../components/SettingsModal'
import { TenantActions, NotificationsActions } from '../../actions/index'

class SettingsModalContainer extends Component {
  constructor (props) {
    super(props)
    this.changeTenant = this.changeTenant.bind(this)
  }

  render () {
    const { close, tenant, visible } = this.props
    return (
      <SettingsModal
        close={close}
        changeTenant={this.changeTenant}
        tenant={tenant}
        visible={visible}
      />
    )
  }

  changeTenant (tenantId) {
    const { close, dispatch, tenant } = this.props
    if (tenant.id === tenantId) return close()

    close()

    dispatch(TenantActions.setCurrent(tenantId))
  }
}

SettingsModalContainer.propTypes = {
  close: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  tenant: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    tenant: state.TenantReducer.current
  }
}

export default connect(mapStateToProps)(SettingsModalContainer)
