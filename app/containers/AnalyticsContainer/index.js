import React, { Component, PropTypes } from 'react'
import { AppState, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { AnalyticsActions } from '../../actions/index'

const heartBeatIntervalSeconds = 3

class AnalyticsContainer extends Component {
  constructor () {
    super()
    this.handleAppStateChange = this.handleAppStateChange.bind(this)
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

  trackScreen () {
    const { dispatch, screen } = this.props
    if (!screen) return
    dispatch(AnalyticsActions.trackScreen(screen))
  }

  startHeartBeat () {
    this.props.dispatch(AnalyticsActions.startHeartBeat())
  }

  stopHeartBeat () {
    this.props.dispatch(AnalyticsActions.stopHeartBeat())
  }

  render () {
    return null
  }
}

AnalyticsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  screen: PropTypes.string
}

export default connect()(AnalyticsContainer)
