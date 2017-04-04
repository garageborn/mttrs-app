import OneSignal from 'react-native-onesignal'
import _isEmpty from 'lodash/isEmpty'
import _find from 'lodash/find'

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
    console.log(getState().StorageReducer)
    console.log('handleTags', tenant)

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

    console.log('setTags', tenant)

    return OneSignal.sendTag(tenant, 'true')
  }
}
