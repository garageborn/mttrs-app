import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from '../../actions/index'

class PopularLinkingContainer extends Component {
  componentDidMount () {
    return this.openPopular()
  }

  render () {
    return null
  }

  openPopular () {
    const { dispatch } = this.props
    this.props.resetNavigating()
    dispatch(NavigationActions.reset())
    dispatch(NavigationActions.popular())
  }
}

PopularLinkingContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  resetNavigating: PropTypes.func.isRequired
}

export default connect()(PopularLinkingContainer)
