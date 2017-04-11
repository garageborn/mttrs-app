import analytics from '../config/Analytics'
import { InteractionManager } from 'react-native'

const heartBeatIntervalSeconds = 5
let heartBeatInterval = null

export function trackScreen (screen) {
  return () => {
    InteractionManager.runAfterInteractions(() => {
      analytics.trackScreenView(screen)
    })
  }
}

export function trackEvent (category, action, optionalValues = {}) {
  console.log('trackEvent', category, action)
  return () => {
    console.log('trackEvent inside', category, action)
    InteractionManager.runAfterInteractions(() => {
      console.log('trackEvent after interactions', category, action)
      analytics.trackEvent(category, action, optionalValues)
    })
  }
}

export function startHeartBeat () {
  console.log('startHeartBeat')
  return (dispatch) => {
    if (heartBeatInterval) return
    console.log('create heartBeatInterval')
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
