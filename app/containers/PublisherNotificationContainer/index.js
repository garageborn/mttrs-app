import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from '../../actions/index'

class PublisherNotificationContainer extends Component {
  componentDidMount () {
    this.handleResult()
  }

  render () {
    return null
  }

  handleResult () {
    let { model, dispatch } = this.props
    return dispatch(NavigationActions.selectPublisher(model))
  }
}

PublisherNotificationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired
}

export default connect()(PublisherNotificationContainer)
