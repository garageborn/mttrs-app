import React, { Component, PropTypes } from 'react'
import { Platform } from 'react-native'
import OneSignal from 'react-native-onesignal'
import { connect } from 'react-redux'
import _isEqual from 'lodash/isEqual'
import LinkNotificationContainer from '../LinkNotificationContainer'
import PublisherNotificationContainer from '../PublisherNotificationContainer'
import CategoryNotificationContainer from '../CategoryNotificationContainer'
import HomeNotificationContainer from '../HomeNotificationContainer'
import { NotificationsActions, TenantActions } from '../../actions/index'

class NotificationsContainer extends Component {
  constructor () {
    super()
    this.handleOpen = this.handleOpen.bind(this)
    this.state = { opened: false, payload: {} }
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
    this.handleTags(nextProps)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.tenant.isLoaded !== nextProps.tenant.isLoaded) return true
    if (this.state.opened !== nextState.opened) return true
    if (this.state.type !== nextState.type) return true
    return !_isEqual(this.state.payload, nextState.payload)
  }

  render () {
    const { tenant } = this.props
    const { opened, payload, type } = this.state

    if (!tenant.isLoaded || !opened) return null

    switch (type) {
      case 'link':
        return <LinkNotificationContainer payload={payload} />
      case 'publisher':
        return <PublisherNotificationContainer payload={payload} />
      case 'category':
        return <CategoryNotificationContainer payload={payload} />
      default:
        return <HomeNotificationContainer payload={payload} />
    }
  }

  handleOpen (result) {
    const { payload } = result.notification
    const { tenant, type } = payload.additionalData

    this.setTenant(tenant)
    return this.setState({ opened: true, payload, type })
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
    if (nextProps.visitedStories.items.length === 4) {
      this.props.dispatch(NotificationsActions.askForPermissions())
    }
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
    visitedStories: state.VisitedStoriesReducer
  }
}

export default connect(mapStateToProps)(NotificationsContainer)
