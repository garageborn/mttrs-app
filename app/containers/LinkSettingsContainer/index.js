import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import LinkDialogContainer from '../../containers/LinkDialogContainer'
import HeaderSettingsButton from '../../components/HeaderSettingsButton'
import { NavigationActions } from '../../actions/index'
import withQuery from './index.gql'

class LinkSettingsContainer extends PureComponent {
  constructor () {
    super()
    this.openSettingsDialog = this.openSettingsDialog.bind(this)
  }

  render () {
    return <HeaderSettingsButton onPress={this.openSettingsDialog} />
  }

  openSettingsDialog () {
    const { dispatch, data } = this.props
    const content = <LinkDialogContainer link={data.link} />
    dispatch(NavigationActions.settingsDialog(content))
  }
}

LinkSettingsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.shape({
    link: PropTypes.object
  }).isRequired
}
const LinkSettingsContainerWithData = withQuery(LinkSettingsContainer)
export default connect()(LinkSettingsContainerWithData)
