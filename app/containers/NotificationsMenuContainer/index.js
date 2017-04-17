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
    const { tags, enabled } = this.props
    return (
      <NotificationsMenu
        toggleTenantNotification={this.toggleTenantNotification}
        enabled={enabled}
        tags={tags}
      />
    )
  }

  toggleTenantNotification (tenant, value) {
    let { dispatch, enabled } = this.props
    if (!enabled) dispatch(NotificationsActions.requestPermissions())
    return dispatch(NotificationsActions.setTenantValue(tenant, value))
  }
}

NotificationsMenuContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tags: PropTypes.object.isRequired,
  enabled: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    enabled: state.NotificationsReducer.enabled,
    tags: state.NotificationsReducer.tags
  }
}

export default connect(mapStateToProps)(NotificationsMenuContainer)
