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
import { NotificationsActions, TenantActions } from '../../actions/index'
import { withAnalytics } from '../../config/AnalyticsProvider'

class NotificationsContainer extends Component {
  constructor () {
    super()
    this.handleOpen = this.handleOpen.bind(this)
    this.state = { opened: false, model: {} }
  }

  componentWillMount () {
    OneSignal.inFocusDisplaying(2)
    OneSignal.addEventListener('opened', this.handleOpen)
    OneSignal.addEventListener('ids', (ids) => { console.log('-----ids', ids) })
  }

  componentWillUnmount () {
    OneSignal.removeEventListener('opened', this.handleOpen)
  }

  componentWillReceiveProps (nextProps) {
    this.handlePermissions(nextProps)
    this.handleTags(nextProps)
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

  handleOpen (result) {
    let { model, type, tenant } = result.notification.payload.additionalData

    this.setTenant(tenant)
    this.context.analytics.trackEvent('notification', 'open', { type, model })
    return this.setState({ opened: true, model, type })
  }

  handlePermissions (nextProps) {
    if (!nextProps.tenant.isLoaded) return
    this.props.dispatch(NotificationsActions.getPermissions())
    this.askForPermissions(nextProps)
  }

  handleTags (nextProps) {
    if (!nextProps.tenant.isLoaded) return
    this.props.dispatch(NotificationsActions.getTags())
  }

  setTenant (id) {
    if (this.props.tenant.current.id === id) return
    const { dispatch } = this.props
    dispatch(TenantActions.setCurrent(id))
  }

  askForPermissions (nextProps) {
    const currentLength = this.props.visitedStories.items.length
    const nextLength = nextProps.visitedStories.items.length

    if (nextLength === currentLength) return
    if (currentLength < 3 && nextLength > 3) return
    this.props.dispatch(NotificationsActions.askForPermissions())
  }
}

NotificationsContainer.propTypes = {
  visitedStories: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  tenant: PropTypes.shape({
    current: PropTypes.shape({
      id: PropTypes.string
    }),
    isLoaded: PropTypes.bool.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    tenant: state.TenantReducer,
    visitedStories: state.StorageReducer.visitedStories
  }
}

const NotificationContainerWithAnalytics = withAnalytics(NotificationsContainer)
export default connect(mapStateToProps)(NotificationContainerWithAnalytics)
