import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Menu from '../../components/Menu'

class MenuContainer extends Component {
  constructor () {
    super()

    this.state = { settingsOpened: false }
    this.toggleSettingsModal = this.toggleSettingsModal.bind(this)
  }

  render () {
    return (
      <Menu
        tenant={this.props.tenant}
        settingsOpened={this.state.settingsOpened}
        toggleSettingsModal={this.toggleSettingsModal}
      />
    )
  }

  toggleSettingsModal () {
    this.setState({ settingsOpened: !this.state.settingsOpened })
  }
}

MenuContainer.propTypes = {
  tenant: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
}

let mapStateToProps = state => {
  return {
    tenant: state.TenantReducer.current
  }
}

export default connect(mapStateToProps)(MenuContainer)
