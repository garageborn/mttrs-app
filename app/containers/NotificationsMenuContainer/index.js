import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NotificationsActions } from '../../actions/index'
import NotificationsMenu from '../../components/NotificationsMenu'

class NotificationsMenuContainer extends Component {
  constructor (props) {
    super(props)
    this.toggleTenantNotification = this.toggleTenantNotification.bind(this)
  }

  render () {
    const { notificationsStatus } = this.props
    return (
      <NotificationsMenu
        toggleTenantNotification={this.toggleTenantNotification}
        notificationsStatus={notificationsStatus}
      />
    )
  }

  toggleTenantNotification (tenant, status) {
    return this.props.dispatch(NotificationsActions.setTenantNotificationStatus(tenant, status))
  }
}

NotificationsMenuContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  notificationsStatus: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    notificationsStatus: state.NotificationsReducer.status
  }
}

export default connect(mapStateToProps)(NotificationsMenuContainer)
