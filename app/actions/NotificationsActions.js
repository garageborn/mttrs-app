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
    const tenant = getState().TenantReducer.id

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
