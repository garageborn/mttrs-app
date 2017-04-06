import { AsyncStorage } from 'react-native'
import OneSignal from 'react-native-onesignal'
import captureError from '../common/utils/captureError'
import _isNil from 'lodash/isNil'

import {
  REQUEST_NOTIFICATIONS_STATUS,
  RECEIVE_NOTIFICATIONS_STATUS,
  RECEIVE_NOTIFICATIONS_PERMISSIONS
} from '../constants/ActionTypes'

export function requestPermissions () {
  return dispatch => {
    const permissions = {
      alert: true,
      badge: true,
      sound: true
    }
    dispatch(handleTags())
    return OneSignal.requestPermissions(permissions)
  }
}

export function setPermissions (status) {
  return (dispatch) => {
    AsyncStorage.setItem('notificationsPermissions', JSON.stringify(status))
    return dispatch(receiveNotificationsPermissions(status))
  }
}

export function checkPermissions () {
  return (dispatch) => {
    OneSignal.checkPermissions((permissions) => {
      let allowed = permissions.alert || permissions.badge || permissions.sound
      if (allowed) return this.handleTags()
      dispatch(setPermissions(false))
    })
  }
}

export function handleTags () {
  return (dispatch, getState) => {
    const tenant = getState().TenantReducer.current.id

    let tags = {
      mttrs_br: 'false',
      mttrs_us: 'false'
    }
    tags[tenant] = 'true'
    OneSignal.sendTags(tags)
    AsyncStorage.setItem('notificationsStatus', JSON.stringify(tags), (error) => {
      if (error) return captureError(error)
      return dispatch(receiveNotificationsStatus(tags))
    })
  }
}

export function getNotificationsStatus () {
  return (dispatch, getState) => {
    dispatch(requestNotificationsStatus())
    AsyncStorage.getItem('notificationsStatus', (error, data) => {
      if (error) return captureError(error)
      if (_isNil(data)) return dispatch(handleTags())
      return dispatch(receiveNotificationsStatus(JSON.parse(data)))
    })
  }
}

export function setTenantNotificationStatus (tenant, tenantStatus) {
  return (dispatch, getState) => {
    let notificationsStatus = getState().NotificationsReducer.status
    let tenantStatusStringified = JSON.stringify(tenantStatus)
    notificationsStatus = {
      ...notificationsStatus,
      [tenant]: tenantStatusStringified
    }
    OneSignal.sendTag(tenant, tenantStatusStringified)
    AsyncStorage.setItem('notificationsStatus', JSON.stringify(notificationsStatus), (error) => {
      if (error) return captureError(error)
      return dispatch(receiveNotificationsStatus(notificationsStatus))
    })
  }
}

export const requestNotificationsStatus = () => ({
  type: REQUEST_NOTIFICATIONS_STATUS
})

export const receiveNotificationsStatus = (payload) => ({
  type: RECEIVE_NOTIFICATIONS_STATUS,
  payload
})

export const receiveNotificationsPermissions = (payload) => ({
  type: RECEIVE_NOTIFICATIONS_PERMISSIONS,
  payload
})
