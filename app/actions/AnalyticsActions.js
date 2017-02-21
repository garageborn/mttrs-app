import analytics from '../config/Analytics'

export function trackScreen (screen) {
  return (dispatch) => {
    console.log(analytics)
    analytics.trackScreenView(screen)
  }
}

export function trackLink (link) {
  return () => {
    console.log(analytics)
    analytics.trackEvent(link.url, 'Open')
  }
}
