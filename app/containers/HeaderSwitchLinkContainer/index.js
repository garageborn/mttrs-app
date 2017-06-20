import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import HeaderSwitchLinkButton from '../../components/HeaderSwitchLinkButton'
import { NavigationActions } from '../../actions/index'

class HeaderSettingsContainer extends Component {
  constructor () {
    super()
    this.onPress = this.onPress.bind(this)
  }

  render () {
    return <HeaderSwitchLinkButton onPress={this.onPress} />
  }

  onPress () {
    const { dispatch } = this.props
    debugger
    dispatch(NavigationActions.storyLinks())
  }
}

HeaderSettingsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(HeaderSettingsContainer)
