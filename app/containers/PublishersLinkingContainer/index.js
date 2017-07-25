import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from '../../actions/index'

class PublishersLinkingContainer extends Component {
  componentDidMount () {
    return this.openPublishers()
  }

  render () {
    return null
  }

  openPublishers () {
    const { dispatch } = this.props
    this.props.resetNavigating()
    dispatch(NavigationActions.reset())
    dispatch(NavigationActions.publishers())
  }
}

PublishersLinkingContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  resetNavigating: PropTypes.func.isRequired
}

export default connect()(PublishersLinkingContainer)
