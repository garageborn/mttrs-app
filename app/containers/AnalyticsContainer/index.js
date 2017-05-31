import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { AnalyticsActions } from '../../actions/index'

class AnalyticsContainer extends Component {
  shouldComponentUpdate (nextProps) {
    if (!nextProps.isCurrentRoute) return false
    if (!this.props.isCurrentRoute && nextProps.isCurrentRoute) return true
  }

  componentDidUpdate () {
    this.trackAnalyticsScreen()
  }

  render () {
    return this.props.children
  }

  trackAnalyticsScreen () {
    const { dispatch, screenName } = this.props
    console.info('trackAnalyticsScreen', screenName)
    dispatch(AnalyticsActions.trackScreen(screenName))
  }
}

AnalyticsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  screenName: PropTypes.string.isRequired,
  scene: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.scene, state.RouterReducer.current.routeName)
  return {
    isCurrentRoute: ownProps.scene === state.RouterReducer.current.routeName
  }
}

export default connect(mapStateToProps)(AnalyticsContainer)
