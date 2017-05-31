import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import EmptyFavoritesTimeline from '../../components/EmptyFavoritesTimeline'
import { NavigationActions } from '../../actions/index'

class EmptyFavoritesTimelineContainer extends Component {
  constructor () {
    super()
    this.openAddFavorites = this.openAddFavorites.bind(this)
  }

  render () {
    return (
      <EmptyFavoritesTimeline onPress={this.openAddFavorites} />
    )
  }

  openAddFavorites () {
    const { dispatch } = this.props
    dispatch(NavigationActions.addFavorites())
  }
}

EmptyFavoritesTimelineContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(EmptyFavoritesTimelineContainer)
