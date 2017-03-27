import analytics from '../config/Analytics'

export function trackScreen (screen) {
  console.log('trackScreen', screen)
  return () => analytics.trackScreenView(screen)
}

export function trackEvent (category, action, optionalValues = {}) {
  console.log('trackEvent', category, action)
  return () => analytics.trackEvent(category, action, optionalValues)
}

