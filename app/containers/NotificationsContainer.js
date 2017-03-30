import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NotificationsActions } from '../actions/index'

class NotificationsContainer extends Component {
  componentWillReceiveProps (nextProps) {
    this.handleNotificationPermissions(nextProps)
  }

  render () {
    return this.props.children
  }

  handleNotificationPermissions (nextProps) {
    if (nextProps.visitedStories.items.length < 3) return
    if (nextProps.visitedStories.items.length === this.props.visitedStories.items.length) return
    return this.props.dispatch(NotificationsActions.requestPermissions())
  }
}

NotificationsContainer.propTypes = {
  visitedStories: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.any
}

const mapStateToProps = state => {
  return {
    visitedStories: state.StorageReducer.visitedStories
  }
}

export default connect(mapStateToProps)(NotificationsContainer)
