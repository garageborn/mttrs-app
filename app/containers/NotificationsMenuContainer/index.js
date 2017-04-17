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
    const { tags, permissions } = this.props
    return (
      <NotificationsMenu
        toggleTenantNotification={this.toggleTenantNotification}
        enabled={permissions.enabled}
        tags={tags.values}
      />
    )
  }

  toggleTenantNotification (tenant, value) {
    let { dispatch, enabled } = this.props
    if (!enabled) dispatch(NotificationsActions.askForPermissions())
    return dispatch(NotificationsActions.setTenantValue(tenant, value))
  }
}

NotificationsMenuContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  permissions: PropTypes.shape({
    enabled: PropTypes.bool.isRequired
  }),
  tags: PropTypes.shape({
    values: PropTypes.object.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    permissions: state.NotificationsReducer.permissions,
    tags: state.NotificationsReducer.tags
  }
}

export default connect(mapStateToProps)(NotificationsMenuContainer)
