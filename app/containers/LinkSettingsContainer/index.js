import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import LinkDialogContainer from '../../containers/LinkDialogContainer'
import HeaderSettingsButton from '../../components/HeaderSettingsButton'
import { NavigationActions } from '../../actions/index'

class LinkSettingsContainer extends PureComponent {
  constructor () {
    super()
    this.openSettingsDialog = this.openSettingsDialog.bind(this)
  }

  render () {
    return <HeaderSettingsButton onPress={this.openSettingsDialog} />
  }

  openSettingsDialog () {
    const { dispatch, story } = this.props
    const content = <LinkDialogContainer story={story} />
    dispatch(NavigationActions.settingsDialog(content))
  }
}

LinkSettingsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
}

export default connect()(LinkSettingsContainer)
