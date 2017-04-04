import React, { Component, PropTypes } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import SettingsModal from '../../components/SettingsModal'
import apolloClient from '../../config/apolloClient'
import { MenuActions, NavigationActions, StorageActions, NotificationsActions } from '../../actions/index'

class SettingsModalContainer extends Component {
  constructor (props) {
    super(props)
    this.changeTenant = this.changeTenant.bind(this)
  }

  render () {
    const { close, tenant, visible, notificationStatus } = this.props
    return (
      <SettingsModal
        close={close}
        changeTenant={this.changeTenant}
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
    dispatch(MenuActions.closeMenu())

    InteractionManager.runAfterInteractions(() => {
      dispatch(StorageActions.setCurrentTenant(tenantId))
      dispatch(NotificationsActions.handleTags())
      apolloClient.resetStore()
      dispatch(NavigationActions.home())
    })
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
    tenant: state.StorageReducer.tenant,
    notificationStatus: state.StorageReducer.notificationStatus
  }
}

export default connect(mapStateToProps)(SettingsModalContainer)
