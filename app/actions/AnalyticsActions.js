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
  return (dispatch, getState) => {
    InteractionManager.runAfterInteractions(() => {
      const event = getEvent(getState(), category)
      analytics.trackEvent(event, action, optionalValues)
    })
  }
}

function getScreen (state, path) {
  return state.TenantReducer.current.id + path
}

function getEvent (state, category) {
  return `${state.TenantReducer.current.id}/${category}`
}
