import OneSignal from 'react-native-onesignal'
import _isEmpty from 'lodash/isEmpty'
import _find from 'lodash/find'

export function addListeners () {
  return (dispatch, getState) => {
    OneSignal.addEventListener('received', onReceived)
    OneSignal.addEventListener('opened', onOpened)
    OneSignal.addEventListener('registered', onRegistered)
    OneSignal.addEventListener('ids', onIds)
  }
}

export function removeListeners () {
  return (dispatch, getState) => {
    OneSignal.removeEventListener('received', onReceived)
    OneSignal.removeEventListener('opened', onOpened)
    OneSignal.removeEventListener('registered', onRegistered)
    OneSignal.removeEventListener('ids', onIds)
  }
}

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

    OneSignal.getTags((receivedTags) => {
      dispatch(setTags(tenant, receivedTags))
    })
  }
}

function setTags (tenant, receivedTags) {
  return dispatch => {
    if (!_isEmpty(receivedTags)) {
      let hasTenant = _find(receivedTags, (key) => key === tenant)
      if (hasTenant) return null
    }

    return OneSignal.sendTag(tenant, 'true')
  }
}

function onReceived(notification) {
  console.log("Notification received: ", notification)
}

function onOpened(openResult) {
  console.log('Message: ', openResult.notification.payload.body)
  console.log('Data: ', openResult.notification.payload.additionalData)
  console.log('isActive: ', openResult.notification.isAppInFocus)
  console.log('openResult: ', openResult)
}

function onRegistered () {
  console.log('registered')
}

function onIds(device) {
  console.log('Device info: ', device)
}
