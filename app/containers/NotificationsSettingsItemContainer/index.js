import React, { Component, PropTypes } from 'react'
import { Switch } from 'react-native'
import { connect } from 'react-redux'
import _result from 'lodash/result'
import TenantListItem from '../../components/TenantListItem'
import { NotificationsActions } from '../../actions/index'
import {
  thumbTintColor,
  thumbTintActive,
  tintColor,
  onTintColor
} from '../../styles/Switch'

class NotificationsSettingsItemContainer extends Component {
  render () {
    const { item } = this.props.data
    return <TenantListItem country={item} rightContent={this.rightContent()} />
  }

  rightContent () {
    const { tenantId } = this.props.data.item
    return (
      <Switch
        tintColor={tintColor}
        onTintColor={onTintColor}
        thumbTintColor={this.thumbTintColor(tenantId)}
        value={this.isEnabled(tenantId)}
        onValueChange={() =>
          this.toggleTenantNotification(tenantId, !this.isEnabled(tenantId))}
      />
    )
  }

  toggleTenantNotification (tenant, value) {
    let { dispatch, permissions } = this.props
    if (!permissions.enabled) { dispatch(NotificationsActions.askForPermissions()) }
    return dispatch(NotificationsActions.setTenantValue(tenant, value))
  }

  isEnabled (tenantId) {
    let { values } = this.props.tags
    return _result(values, tenantId) === 'true'
  }

  thumbTintColor (tenantId) {
    return this.isEnabled(tenantId) ? thumbTintActive : thumbTintColor
  }
}

NotificationsSettingsItemContainer.propTypes = {
  data: PropTypes.shape({
    item: PropTypes.shape({
      tenantId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  permissions: PropTypes.shape({
    enabled: PropTypes.bool.isRequired
  }),
  tags: PropTypes.shape({
    values: PropTypes.object.isRequired
  }).isRequired
}

const mapStateToProps = state => {
  return {
    permissions: state.NotificationsReducer.permissions,
    tags: state.NotificationsReducer.tags
  }
}

export default connect(mapStateToProps)(NotificationsSettingsItemContainer)
