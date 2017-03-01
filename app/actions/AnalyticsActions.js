import analytics from '../config/Analytics'

export function trackScreen (screen) {
  return () => analytics.trackScreenView(screen)
}
