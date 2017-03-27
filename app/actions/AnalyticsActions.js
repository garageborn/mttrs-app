import analytics from '../config/Analytics'
import { InteractionManager } from 'react-native'

const heartBeatIntervalSeconds = 3
let heartBeatInterval = null

export function trackScreen (screen) {
  return () => {
    InteractionManager.runAfterInteractions(() => {
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
    dispatch(stopHeartBeat())
    heartBeatInterval = setInterval(trackHeartBeat, (heartBeatIntervalSeconds * 1000))
  }
}

export function stopHeartBeat () {
  return () => {
    if (heartBeatInterval) clearTimeout(heartBeatInterval)
  }
}

function trackHeartBeat () {
  trackEvent('heartbeat', 'beat')
}
