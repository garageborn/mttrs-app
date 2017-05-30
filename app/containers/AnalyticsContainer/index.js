import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { AnalyticsActions } from '../../actions/index'

class AnalyticsContainer extends Component {
  componentDidMount () {
    this.trackAnalyticsScreen()
  }

  render () {
    return this.props.children
  }

  trackAnalyticsScreen () {
    const { dispatch, screenName } = this.props
    dispatch(AnalyticsActions.trackScreen(screenName))
  }
}

AnalyticsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  screenName: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  console.log(state.RouterReducer.current.routeName)
  return {
  }
}

export default connect(mapStateToProps)(AnalyticsContainer)
