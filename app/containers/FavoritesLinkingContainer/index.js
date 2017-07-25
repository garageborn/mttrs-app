import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from '../../actions/index'

class FavoritesLinkingContainer extends Component {
  componentDidMount () {
    return this.openFavorites()
  }

  render () {
    return null
  }

  openFavorites () {
    const { dispatch } = this.props
    this.props.resetNavigating()
    dispatch(NavigationActions.reset())
    dispatch(NavigationActions.favorites())
  }
}

FavoritesLinkingContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  resetNavigating: PropTypes.func.isRequired
}

export default connect()(FavoritesLinkingContainer)
