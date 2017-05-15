import analytics from '../config/Analytics'
import { InteractionManager } from 'react-native'

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

function getScreen (state, path) {
  return state.TenantReducer.current.id + path
}
