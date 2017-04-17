import { AsyncStorage, Platform } from 'react-native'
import OneSignal from 'react-native-onesignal'
import captureError from '../common/utils/captureError'
import { parse, stringify } from '../common/utils/Parser'
import _isEmpty from 'lodash/isEmpty'

import {
  REQUEST_NOTIFICATIONS_TAGS,
  RECEIVE_NOTIFICATIONS_TAGS,
  RECEIVE_NOTIFICATIONS_PERMISSION
} from '../constants/ActionTypes'

export function requestPermissions () {
  return dispatch => {
    if (Platform.OS === 'android') return
    const permissions = { alert: true, badge: true, sound: true }
    return OneSignal.requestPermissions(permissions)
  }
}

export function getPermissions () {
  return dispatch => {
    if (Platform.OS === 'android') return
    OneSignal.checkPermissions((permissions) => {
      let enabled = (permissions.alert || permissions.badge || permissions.sound) === 1
      dispatch(receivePermissions(enabled))
    })
  }
}

export function getTags () {
  return (dispatch, getState) => {
    if (getState().NotificationsReducer.isFetching) return
    if (getState().NotificationsReducer.isLoaded) return

    dispatch(requestTags())
    OneSignal.getTags((tags) => {
      if (_isEmpty(tags)) {
        return dispatch(initTags())
      } else {
        return dispatch(receiveTags(tags))
      }
    })
  }
}

export function setTenantValue (tenant, value) {
  return (dispatch, getState) => {
    let stringifiedValue = stringify(value)
    OneSignal.sendTag(tenant, stringifiedValue)
    const tags = {
      ...getState().NotificationsReducer.tags,
      [tenant]: stringifiedValue
    }
    return dispatch(receiveTags(tags))
  }
}

function initTags () {
  return (dispatch, getState) => {
    const tenant = getState().TenantReducer.current.id

    let tags = { mttrs_br: 'false', mttrs_us: 'false' }
    tags[tenant] = 'true'
    OneSignal.sendTags(tags)
    dispatch(receiveTags(tags))
  }
}

export const requestTags = () => ({
  type: REQUEST_NOTIFICATIONS_TAGS
})

export const receiveTags = (tags) => ({
  type: RECEIVE_NOTIFICATIONS_TAGS,
  tags
})

export const receivePermission = (enabled) => ({
  type: RECEIVE_NOTIFICATIONS_PERMISSION,
  enabled
})
