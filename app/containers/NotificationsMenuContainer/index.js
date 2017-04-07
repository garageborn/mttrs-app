import React, { Component, PropTypes } from 'react'
import { Platform } from 'react-native'
import { connect } from 'react-redux'
import { NotificationsActions } from '../../actions/index'
import NotificationsMenu from '../../components/NotificationsMenu'

class NotificationsMenuContainer extends Component {
  constructor (props) {
    super(props)
    this.toggleTenantNotification = this.toggleTenantNotification.bind(this)
  }

  render () {
    const { status } = this.props
    return (
      <NotificationsMenu
        toggleTenantNotification={this.toggleTenantNotification}
        notificationsStatus={status}
      />
    )
  }

  toggleTenantNotification (tenant, status) {
    let { dispatch, permissions } = this.props
    if (Platform.OS === 'ios' && !permissions) dispatch(NotificationsActions.requestPermissions())
    return dispatch(NotificationsActions.setTenantNotificationStatus(tenant, status))
  }
}

NotificationsMenuContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
  permissions: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    permissions: state.NotificationsReducer.permissions,
    status: state.NotificationsReducer.status
  }
}

export default connect(mapStateToProps)(NotificationsMenuContainer)
