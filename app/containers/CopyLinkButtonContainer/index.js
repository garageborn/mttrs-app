import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Clipboard } from 'react-native'
import { NavigationActions } from '../../actions/index'
import CopyLinkButton from '../../components/CopyLinkButton'

class CopyLinkButtonContainer extends Component {
  constructor () {
    super()
    this.onPress = this.onPress.bind(this)
  }

  onPress () {
    const { link } = this.props
    const url = link.amp_url || link.url
    Clipboard.setString(url)
    this.props.dispatch(NavigationActions.closeModal())
  }

  render () {
    return (
      <CopyLinkButton onPress={this.onPress} />
    )
  }
}

CopyLinkButtonContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  link: PropTypes.shape({
    amp_url: PropTypes.string,
    url: PropTypes.string.isRequired
  }).isRequired
}

export default connect()(CopyLinkButtonContainer)
