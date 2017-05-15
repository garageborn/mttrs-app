import analytics from '../config/Analytics'
import { InteractionManager } from 'react-native'

const heartBeatIntervalSeconds = 30
let heartBeatInterval = null

export function trackScreen (path) {
  return (dispatch, getState) => {
    InteractionManager.runAfterInteractions(() => {
      const screen = getScreen(getState(), path)
      analytics.trackScreenView(screen)
    })
  }
}

export function trackEvent (category, action, optionalValues = {}) {
  return () => {
    InteractionManager.runAfterInteractions(() => {
      analytics.trackEvent(category, action, optionalValues)
    })
  }
}

export function startHeartBeat () {
  return (dispatch) => {
    if (heartBeatInterval) return
    const trackHeartBeat = () => dispatch(trackEvent('heartbeat', 'beat'))
    heartBeatInterval = setInterval(trackHeartBeat, (heartBeatIntervalSeconds * 1000))
  }
}

export function stopHeartBeat () {
  return () => {
    if (heartBeatInterval) clearTimeout(heartBeatInterval)
  }
}

function getScreen (state, path) {
  return state.TenantReducer.current.id + path
}
