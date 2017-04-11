import React, {Component, Children, PropTypes} from 'react'
import { AppState } from 'react-native'
import { connect } from 'react-redux'
import { AnalyticsActions } from '../actions/index'

class AnalyticsProvider extends Component {
  constructor () {
    super()
    this.trackScreen = this.trackScreen.bind(this)
    this.trackEvent = this.trackEvent.bind(this)
  }

  componentDidMount () {
    AppState.addEventListener('change', this.handleAppStateChange)
    this.startHeartBeat()
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this.handleAppStateChange)
    this.stopHeartBeat()
  }

  handleAppStateChange (appState) {
    if (appState === 'active') {
      this.trackScreen()
      this.startHeartBeat()
    } else {
      this.stopHeartBeat()
    }
  }

  getChildContext () {
    return {
      analytics: { trackScreen: this.trackScreen, trackEvent: this.trackEvent }
    }
  }

  render () {
    return this.props.children
  }

  trackScreen (screen) {
    const { dispatch } = this.props
    if (!screen) return
    dispatch(AnalyticsActions.trackScreen(screen))
  }

  trackEvent (category, action, optionalValues = {}) {
    const { dispatch } = this.props
    dispatch(AnalyticsActions.trackEvent(category, action, optionalValues))
  }

  startHeartBeat () {
    const { dispatch } = this.props
    dispatch(AnalyticsActions.startHeartBeat())
  }

  stopHeartBeat () {
    const { dispatch } = this.props
    dispatch(AnalyticsActions.stopHeartBeat())
  }
}

export function injectAnalytics (WrappedComponent) {
  class InjectAnalytics extends Component {
    render () {
      return (
        <WrappedComponent
          {...this.props}
          {...{analytics: this.context.analytics}}
        />
      )
    }
  }

  InjectAnalytics.contextTypes = {
    analytics: PropTypes.shape({
      trackScreen: PropTypes.func.isRequired,
      trackEvent: PropTypes.func.isRequired
    })
  }

  return InjectAnalytics
}

AnalyticsProvider.childContextTypes = {
  analytics: PropTypes.shape({
    trackScreen: PropTypes.func.isRequired,
    trackEvent: PropTypes.func.isRequired
  })
}

AnalyticsProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default connect()(AnalyticsProvider)
