import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Menu from '../../components/Menu'

class MenuContainer extends Component {
  constructor () {
    super()

    this.toggleSettingsModal = this.toggleSettingsModal.bind(this)

    this.state = {
      settingsOpen: false
    }
  }

  render () {
    return (
      <Menu
        {...this.props}
        namespace={this.getTenantName(this.props.tenantName)}
        settingsOpen={this.state.settingsOpen}
        toggleSettingsModal={this.toggleSettingsModal}
      />
    )
  }

  toggleSettingsModal () {
    this.setState({ settingsOpen: !this.state.settingsOpen })
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
