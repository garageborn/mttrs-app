import React, { Component, PropTypes } from 'react'
import OneSignal from 'react-native-onesignal'
import { connect } from 'react-redux'
import { NotificationsActions, AnalyticsActions } from '../../actions/index'
import LinkNotificationContainer from '../LinkNotificationContainer'
import PublisherNotificationContainer from '../PublisherNotificationContainer'
import CategoryNotificationContainer from '../CategoryNotificationContainer'
import HomeNotificationContainer from '../HomeNotificationContainer'

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

  render () {
    let { opened, model, type } = this.state
    if (!opened) return null
    switch (type) {
      case 'link':
        return <LinkNotificationContainer model={model} />
      case 'publisher':
        return <PublisherNotificationContainer model={model} />
      case 'category':
        return <CategoryNotificationContainer model={model} />
      default:
        return <HomeNotificationContainer />
    }
  }

  handleOpen (result) {
    this.props.dispatch(AnalyticsActions.trackEvent('notification', 'open'))
    if (!result.notification.payload.additionalData) return this.setState({ opened: true })
    let { model, type } = result.notification.payload.additionalData
    return this.setState({ opened: true, model, type })
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
