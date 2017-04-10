import React, { Component, PropTypes } from 'react'
import { Platform } from 'react-native'
import OneSignal from 'react-native-onesignal'
import { connect } from 'react-redux'
import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'
import LinkNotificationContainer from '../LinkNotificationContainer'
import PublisherNotificationContainer from '../PublisherNotificationContainer'
import CategoryNotificationContainer from '../CategoryNotificationContainer'
import HomeNotificationContainer from '../HomeNotificationContainer'
import { AnalyticsActions, NotificationsActions, TenantActions } from '../../actions/index'

class NotificationsContainer extends Component {
  constructor () {
    super()
    this.handleOpen = this.handleOpen.bind(this)
    this.state = { opened: false, model: {} }
  }

  componentWillMount () {
    OneSignal.inFocusDisplaying(2)
    OneSignal.addEventListener('opened', this.handleOpen)
  }

  componentWillUnmount () {
    OneSignal.removeEventListener('opened', this.handleOpen)
  }

  componentWillReceiveProps (nextProps) {
    this.handlePermissions(nextProps)
    this.handleNotificationsStatus(nextProps)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.tenant.isLoaded !== nextProps.tenant.isLoaded) return true
    if (this.state.opened !== nextState.opened) return true
    if (this.state.type !== nextState.type) return true
    return !_isEqual(this.state.model, nextState.model)
  }

  render () {
    const { tenant } = this.props
    const { opened, model, type } = this.state

    if (!tenant.isLoaded || !opened) return null

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

  handleNotificationsStatus (nextProps) {
    if (!nextProps.tenant.isLoaded) return
    if (Platform.OS === 'ios') return this.props.dispatch(NotificationsActions.checkPermissions())
    return this.props.dispatch(NotificationsActions.getStatus())
  }

  handleOpen (result) {
    const { dispatch } = this.props
    let { model, type, tenant } = result.notification.payload.additionalData

    this.setTenant(tenant)
    dispatch(AnalyticsActions.trackEvent('notification', 'open', { type, model }))
    return this.setState({ opened: true, model, type })
  }

  handlePermissions (nextProps) {
    if (!nextProps.tenant.isLoaded) return
    if (nextProps.visitedStories.items.length > 3) return
    if (nextProps.visitedStories.items.length === this.props.visitedStories.items.length) return
    if (this.props.visitedStories.items.length < 3) return
    return this.props.dispatch(NotificationsActions.requestPermissions())
  }

  setTenant (id) {
    if (this.props.tenant.current.id === id) return
    const { dispatch } = this.props
    dispatch(TenantActions.setCurrent(id))
  }
}

NotificationsContainer.propTypes = {
  visitedStories: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  notificationsStatus: PropTypes.object.isRequired,
  tenant: PropTypes.shape({
    current: PropTypes.shape({
      id: PropTypes.string
    }),
    isLoaded: PropTypes.bool.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    notificationsStatus: state.NotificationsReducer.status,
    tenant: state.TenantReducer,
    visitedStories: state.StorageReducer.visitedStories
  }
}

export default connect(mapStateToProps)(NotificationsContainer)
