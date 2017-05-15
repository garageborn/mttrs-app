import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { OPEN_NOTIFICATION } from '../../constants/Analytics'
import { AnalyticsActions, NavigationActions } from '../../actions/index'

class HomeNotificationContainer extends Component {
  componentDidMount () {
    const { dispatch, payload } = this.props
    dispatch(NavigationActions.home())
    dispatch(AnalyticsActions.trackEvent(OPEN_NOTIFICATION, payload.body))
  }

  render () {
    return null
  }
}

HomeNotificationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  payload: PropTypes.shape({
    body: PropTypes.string.isRequired
  }).isRequired
}

export default connect()(HomeNotificationContainer)
