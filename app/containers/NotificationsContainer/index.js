import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import OneSignal from 'react-native-onesignal'
import { connect } from 'react-redux'
import { NotificationsActions } from '../../actions/index'
import NotificationOpenedContainer from '../NotificationOpenedContainer'

class NotificationsContainer extends Component {
  constructor () {
    super()
    this.handleOpen = this.handleOpen.bind(this)
    this.handleRegister = this.handleRegister.bind(this)

    this.state = {
      opened: false,
      model: {
        slug: null
      }
    }
  }

  componentWillMount () {
    console.log('NotificationsContainer componentWillMount')
    OneSignal.addEventListener('opened', this.handleOpen)
    OneSignal.addEventListener('received', (data) => console.log(data))
    // OneSignal.addEventListener('registered', this.handleRegister)
  }

  componentWillUnmount () {
    OneSignal.removeEventListener('opened', this.handleOpen)
    OneSignal.removeEventListener('registered', this.handleRegister)
  }

  componentWillReceiveProps (nextProps) {
    this.handlePermissions(nextProps)
  }

  // componentWillUpdate (nextProps, nextState) {
  //   console.log(nextState)
  // }

  render () {
    if (this.state.opened) return this.rendferNotificationOpenedContainer()
    return this.props.children
  }

  handleOpen (result) {
    console.log('NotificationsContainer handleOpen', result)
    let { model } = result.notification.payload.additionalData
    this.setState({ opened: true, model })
  }

  rendferNotificationOpenedContainer () {
    return (
      <NotificationOpenedContainer model={this.state.model}>
        {this.props.children}
      </NotificationOpenedContainer>
    )
  }

  handleRegister () {
    console.log('registered')
  }

  handlePermissions (nextProps) {
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

const mapStateToProps = (state, ownProps) => {
  return {
    visitedStories: state.StorageReducer.visitedStories
  }
}

export default connect(mapStateToProps)(NotificationsContainer)
