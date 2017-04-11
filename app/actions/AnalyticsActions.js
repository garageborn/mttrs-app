import analytics from '../config/Analytics'
import { InteractionManager } from 'react-native'

const heartBeatIntervalSeconds = 30
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
