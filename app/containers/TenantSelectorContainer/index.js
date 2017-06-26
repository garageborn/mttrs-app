import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { TenantActions } from '../../actions/index'
import TenantSelector from '../../components/TenantSelector'

class TenantSelectorContainer extends Component {
  constructor () {
    super()
    this.selectTenant = this.selectTenant.bind(this)
  }

  render () {
    return <TenantSelector onPress={this.selectTenant} />
  }

  selectTenant (tenantId) {
    this.props.dispatch(TenantActions.setCurrent(tenantId))
  }
}

TenantSelectorContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(TenantSelectorContainer)
