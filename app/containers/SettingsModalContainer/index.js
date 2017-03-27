import React, { Component, PropTypes } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import SettingsModal from '../../components/SettingsModal'
import { locale } from '../../config/IntlProvider'
import apolloClient from '../../config/apolloClient'
import { MenuActions, NavigationActions, StorageActions } from '../../actions/index'

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

    dispatch(StorageActions.setCurrentTenant(tenantId))
    apolloClient.resetStore()

    dispatch(MenuActions.closeMenu())

    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(NavigationActions.home())
      close()
    })
  }
}

SettingsModalContainer.propTypes = {
  close: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  return {
    tenant: state.StorageReducer.tenant
  }
}

export default connect(mapStateToProps)(SettingsModalContainer)
