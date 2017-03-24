import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Menu from '../../components/Menu'

class MenuContainer extends Component {
  constructor () {
    super()

    this.toggleSettingsModal = this.toggleSettingsModal.bind(this)
    this.getTenantName = this.getTenantName.bind(this)

    this.state = {
      settingsOpened: false
    }
  }

  render () {
    return (
      <Menu
        {...this.props}
        tenant={this.getTenantName(this.props.tenantName)}
        settingsOpened={this.state.settingsOpened}
        toggleSettingsModal={this.toggleSettingsModal}
        getTenantName={this.getTenantName}
      />
    )
  }

  toggleSettingsModal () {
    this.setState({ settingsOpened: !this.state.settingsOpened })
  }

  getTenantName (tenant) {
    const tenants = {
      mttrs_us: 'English - USA',
      mttrs_br: 'Português - Brasil'
    }

    return tenants[tenant]
  }
}

MenuContainer.propTypes = {
  tenantName: PropTypes.string.isRequired
}

let mapStateToProps = state => {
  return {
    tenantName: state.StorageReducer.tenant.name
  }
}

export default connect(mapStateToProps)(MenuContainer)
