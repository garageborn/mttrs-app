import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from '../../actions/index'

class HomeNotificationContainer extends Component {
  componentDidMount () {
    this.handleResult()
  }

  render () {
    return null
  }

  handleResult () {
    let { dispatch } = this.props
    return dispatch(NavigationActions.home())
  }
}

HomeNotificationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(HomeNotificationContainer)
