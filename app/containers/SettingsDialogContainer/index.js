import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SettingsDialog from '../../components/SettingsDialog'

class SettingsDialogContainer extends Component {
  constructor () {
    super()
    this.openSettings = this.openSettings.bind(this)
    this.setTenant = this.setTenant.bind(this)
  }

  render () {
    const { tenant } = this.props
    if (!tenant.isLoaded) return null

    return (
      <SettingsDialog
        openSettings={this.openSettings}
        setTenant={this.setTenant}
        />
    )
  }

  openSettings () {
    console.log('opensettings')
  }

  setTenant (tenant) {
    console.log('setTenant')
  }
}

SettingsDialogContainer.propTypes = {
  tenant: PropTypes.shape({
    current: PropTypes.shape({
      id: PropTypes.string
    }),
    isLoaded: PropTypes.bool.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    tenant: {
      isLoaded: state.TenantReducer.isLoaded,
      current: state.TenantReducer.current
    }
  }
}

export default connect(mapStateToProps)(SettingsDialogContainer)
