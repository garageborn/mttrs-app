import analytics from '../config/Analytics'

export function trackScreen (screen) {
  return () => analytics.trackScreenView(screen)
}

export function trackLink (link) {
  return () => analytics.trackEvent(link.url, 'Open')
}
