import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { AnalyticsActions } from '../../actions/index'

class AnalyticsContainer extends Component {
  componentDidMount () {
    const { isCurrentRoute } = this.props
    if (isCurrentRoute) this.trackAnalyticsScreen()
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.isCurrentRoute) return
    if (this.props.isCurrentRoute === nextProps.isCurrentRoute) return
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
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  isCurrentRoute: PropTypes.bool.isRequired,
  screenName: PropTypes.string.isRequired,
  scene: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  // console.log('mapStateToProps', ownProps.scene, state.RouterReducer.current.routeName)
  return {
    isCurrentRoute: ownProps.scene === state.RouterReducer.current.routeName
  }
}

export default connect(mapStateToProps)(AnalyticsContainer)
