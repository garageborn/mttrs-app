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
        {...this.props}
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
    tenant: state.StorageReducer.tenant
  }
}

export default connect(mapStateToProps)(MenuContainer)
