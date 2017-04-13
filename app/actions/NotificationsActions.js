import { AsyncStorage } from 'react-native'
import OneSignal from 'react-native-onesignal'
import captureError from '../common/utils/captureError'
import { parse, stringify } from '../common/utils/Parser'
import _isNil from 'lodash/isNil'

import {
  REQUEST_NOTIFICATIONS_STATUS,
  RECEIVE_NOTIFICATIONS_STATUS,
  RECEIVE_NOTIFICATIONS_PERMISSIONS
} from '../constants/ActionTypes'

const notificationsStatus = 'notificationsStatus'

export function requestPermissions () {
  return dispatch => {
    const permissions = {
      alert: true,
      badge: true,
      sound: true
    }
    dispatch(initTags())
    return OneSignal.requestPermissions(permissions)
  }
}

export function setPermissions (status) {
  return (dispatch) => {
    const allowed = status === 1
    return dispatch(receiveNotificationsPermissions(allowed))
  }
}

export function checkPermissions () {
  return (dispatch) => {
    OneSignal.checkPermissions((permissions) => {
      let allowed = permissions.alert || permissions.badge || permissions.sound
      dispatch(getStatus())
      dispatch(setPermissions(allowed))
    })
  }
}

export function initTags () {
  return (dispatch, getState) => {
    const tenant = getState().TenantReducer.current.id

    let tags = {
      mttrs_br: 'false',
      mttrs_us: 'false'
    }
    tags[tenant] = 'true'
    OneSignal.sendTags(tags)
    dispatch(receiveNotificationsStatus(tags))
  }
}

export function getStatus () {
  return (dispatch, getState) => {
    dispatch(requestNotificationsStatus())
    OneSignal.getTags((tags) => {
      return dispatch(receiveNotificationsStatus(tags))
    })
  }
}

export function setTenantNotificationStatus (tenant, tenantStatus) {
  return (dispatch, getState) => {
    let { status } = getState().NotificationsReducer
    let tenantStatusStringified = stringify(tenantStatus)
    status = {
      ...status,
      [tenant]: tenantStatusStringified
    }
    OneSignal.sendTag(tenant, tenantStatusStringified)
    return dispatch(receiveNotificationsStatus(status))
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
