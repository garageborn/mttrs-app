import { Platform } from 'react-native'
import OneSignal from 'react-native-onesignal'
import { stringify } from '../common/utils/Parser'
import _isEmpty from 'lodash/isEmpty'

import {
  REQUEST_NOTIFICATIONS_PERMISSIONS,
  RECEIVE_NOTIFICATIONS_PERMISSIONS,
  REQUEST_NOTIFICATIONS_TAGS,
  RECEIVE_NOTIFICATIONS_TAGS
} from '../constants/ActionTypes'

export function getPermissions () {
  return (dispatch, getState) => {
    if (Platform.OS === 'android') return

    if (getState().NotificationsReducer.permissions.isFetching) return
    if (getState().NotificationsReducer.permissions.isLoaded) return

    dispatch(requestPermissions())
    OneSignal.checkPermissions((permissions) => {
      let enabled = (permissions.alert || permissions.badge || permissions.sound) === 1
      dispatch(receivePermissions(enabled))
    })
  }
}

export function getTags () {
  return (dispatch, getState) => {
    if (getState().NotificationsReducer.tags.isFetching) return
    if (getState().NotificationsReducer.tags.isLoaded) return

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

export function askForPermissions () {
  return (dispatch, getState) => {
    if (Platform.OS === 'android') return
    if (getState().NotificationsReducer.permissions.enabled) return

    const permissions = { alert: true, badge: true, sound: true }
    dispatch(receivePermissions(true))
    return OneSignal.requestPermissions(permissions)
  }
}

export function setTenantValue (tenant, value) {
  return (dispatch, getState) => {
    let stringifiedValue = stringify(value)
    OneSignal.sendTag(tenant, stringifiedValue)

    const tags = {
      ...getState().NotificationsReducer.tags.values,
      [tenant]: stringifiedValue
    }
    return dispatch(receiveTags(tags))
  }
}

function initTags () {
  return (dispatch, getState) => {
    const tenant = getState().TenantReducer.current.id
    const tags = {
      ...getState().NotificationsReducer.tags.values,
      [tenant]: 'true'
    }
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

export const requestPermissions = () => ({
  type: REQUEST_NOTIFICATIONS_PERMISSIONS
})

export const receivePermissions = (enabled) => ({
  type: RECEIVE_NOTIFICATIONS_PERMISSIONS,
  enabled
})
