import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SettingsDialogContainer from '../../containers/SettingsDialogContainer'
import HeaderSettingsButton from '../../components/HeaderSettingsButton'
import { NavigationActions } from '../../actions/index'

class HeaderSettingsContainer extends Component {
  constructor () {
    super()
    this.openSettingsDialog = this.openSettingsDialog.bind(this)
  }

  render () {
    return <HeaderSettingsButton onPress={this.openSettingsDialog} />
  }

  openSettingsDialog () {
    console.log('openSettingsDialog')
    // const { dispatch } = this.props
    // const content = <SettingsDialogContainer />
    // dispatch(NavigationActions.settingsDialog(content))
  }
}

// HeaderSettingsContainer.propTypes = {
//   dispatch: PropTypes.func.isRequired
// }

export default HeaderSettingsContainer
// export default connect()(HeaderSettingsContainer)
