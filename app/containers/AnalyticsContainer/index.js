import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { AnalyticsActions } from '../../actions/index'

class AnalyticsContainer extends Component {
  componentDidMount () {
    const { isCurrentRoute } = this.props
    if (isCurrentRoute) this.trackAnalyticsScreen()
  }

  componentWillReceiveProps (nextProps) {
    if (this.becameActive(nextProps)) this.trackAnalyticsScreen()
  }

  render () {
    return this.props.children
  }

  trackAnalyticsScreen () {
    const { dispatch, screenName } = this.props
    dispatch(AnalyticsActions.trackScreen(screenName))
  }

  becameActive (nextProps) {
    if (!nextProps.isCurrentRoute) return false
    if (this.props.isCurrentRoute === nextProps.isCurrentRoute) return false
    return true
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
  return {
    isCurrentRoute: ownProps.scene === state.RouterReducer.current.routeName
  }
}

export default connect(mapStateToProps)(AnalyticsContainer)
