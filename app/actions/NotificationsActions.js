import OneSignal from 'react-native-onesignal'

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
    return OneSignal.requestPermissions(permissions)
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

function onRegistered(notifData) {
  console.log("Device had been registered for push notifications!", notifData)
}

function onIds(device) {
  console.log('Device info: ', device)
}
