import React, { Component, PropTypes } from 'react'
import { Platform } from 'react-native'
import OneSignal from 'react-native-onesignal'
import { connect } from 'react-redux'
import _isEqual from 'lodash/isEqual'
import Tenant from '../../common/utils/Tenant'
import LinkNotificationContainer from '../LinkNotificationContainer'
import PublisherNotificationContainer from '../PublisherNotificationContainer'
import CategoryNotificationContainer from '../CategoryNotificationContainer'
import HomeNotificationContainer from '../HomeNotificationContainer'
import {
  AnalyticsActions,
  NotificationsActions,
  StorageActions,
  TenantActions
} from '../../actions/index'

class NotificationsContainer extends Component {
  constructor () {
    super()
    this.handleOpen = this.handleOpen.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.state = { opened: false, model: {} }
  }

  componentWillMount () {
    OneSignal.addEventListener('opened', this.handleOpen)
    OneSignal.addEventListener('received', (data) => console.log(data))
    // OneSignal.addEventListener('registered', this.handleRegister)
    this.handleNotificationStatus()
  }

  componentWillUnmount () {
    OneSignal.removeEventListener('opened', this.handleOpen)
    OneSignal.removeEventListener('registered', this.handleRegister)
  }

  componentWillReceiveProps (nextProps) {
    this.handlePermissions(nextProps)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.opened !== nextState.opened) return true
    if (this.state.type !== nextState.type) return true
    return !_isEqual(this.state.model, nextState.model)
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

  handleNotificationStatus () {
    if (Platform.OS === 'ios') return null
    return this.props.dispatch(StorageActions.getNotificationStatus())
  }

  handleOpen (result) {
    const { dispatch } = this.props
    let { model, type, tenant } = result.notification.payload.additionalData

    this.setTenant(tenant)
    dispatch(AnalyticsActions.trackEvent('notification', 'open', { type, model }))
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

  setTenant (id) {
    if (this.props.tenant.id === id) return
    const { dispatch } = this.props
    dispatch(TenantActions.setCurrent(id))
  }
}

NotificationsContainer.propTypes = {
  visitedStories: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  tenant: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    tenant: state.TenantReducer.current,
    visitedStories: state.StorageReducer.visitedStories
  }
}

export default connect(mapStateToProps)(NotificationsContainer)
