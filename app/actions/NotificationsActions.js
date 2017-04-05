import { AsyncStorage } from 'react-native'
import OneSignal from 'react-native-onesignal'
import captureError from '../common/utils/captureError'
import _isEmpty from 'lodash/isEmpty'
import _isNil from 'lodash/isNil'

import {
  REQUEST_NOTIFICATIONS_STATUS,
  RECEIVE_NOTIFICATIONS_STATUS
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

export function handleTags () {
  return (dispatch, getState) => {
    const tenant = getState().StorageReducer.tenant.id

    let tags = {
      mttrs_br: 'false',
      mttrs_us: 'false'
    }

    tags[tenant] = 'true'
    OneSignal.sendTags(tags)
    AsyncStorage.setItem('notificationsStatus', JSON.stringify(tags))
    return dispatch(receiveNotificationsStatus(tags))
  }
}

export function getNotificationsStatus () {
  return (dispatch, getState) => {
    dispatch(requestNotificationsStatus())
    AsyncStorage.getItem('notificationsStatus', (error, data) => {
      if (error) captureError(error)
      if (_isNil(data)) return dispatch(handleTags())
      return dispatch(receiveNotificationsStatus(JSON.parse(data)))
    })
  }
}

export function setNotificationsStatus (receivedTags) {
  return dispatch => {
    let tags = receivedTags || {}
    AsyncStorage.setItem('notificationsStatus', JSON.stringify(tags))
    dispatch(receiveNotificationsStatus(receivedTags))
  }
}

export function setTenantNotificationStatus (tenant, tenantStatus) {
  return (dispatch, getState) => {
    let notificationsStatus = getState().NotificationsReducer.status
    let tenantStatusStringified = JSON.stringify(tenantStatus)
    let notificationsStatusManipulated = notificationsStatus
    notificationsStatusManipulated[tenant] = tenantStatusStringified
    OneSignal.sendTag(tenant, tenantStatusStringified)
    AsyncStorage.setItem('notificationsStatus', JSON.stringify(notificationsStatusManipulated))
    dispatch(receiveNotificationsStatus(notificationsStatusManipulated))
  }
}

export const requestNotificationsStatus = () => ({
  type: REQUEST_NOTIFICATIONS_STATUS
})

export const receiveNotificationsStatus = (payload) => ({
  type: RECEIVE_NOTIFICATIONS_STATUS,
  payload
})
