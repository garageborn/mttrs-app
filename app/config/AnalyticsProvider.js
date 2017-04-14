import React, { Component, Children, PropTypes } from 'react'
import { AppState, View } from 'react-native'
import { connect } from 'react-redux'
import { AnalyticsActions } from '../actions/index'
import { InterstitialAdManager } from 'react-native-fbads'
import { AdSettings } from 'react-native-fbads'


class AnalyticsProvider extends Component {
  constructor (props) {
    super(props)
    this.handleAppStateChange = this.handleAppStateChange.bind(this)
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

export function withAnalytics (WrappedComponent) {
  WrappedComponent.contextTypes = {
    analytics: PropTypes.shape({
      trackScreen: PropTypes.func.isRequired,
      trackEvent: PropTypes.func.isRequired
    })
  }

  return WrappedComponent
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
