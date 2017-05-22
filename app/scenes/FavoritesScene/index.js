import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FavoritePublishersActions } from '../../actions/index'
import FavoritesTimelineScene from '../FavoritesTimelineScene'
import AddFavoritesScene from '../AddFavoritesScene'

class FavoritesScene extends Component {
  componentWillMount () {
    this.props.dispatch(FavoritePublishersActions.getPublishers())
  }

  render () {
    const { isLoaded, exists } = this.props
    if (!isLoaded) return null
    console.log('exists', exists)

    return <AddFavoritesScene />

    // return exists ? <FavoritesTimelineScene /> : <AddFavoritesScene />
  }
}

FavoritesScene.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  exists: PropTypes.bool.isRequired
}

let mapStateToProps = (state, ownProps) => {
  return {
    isLoaded: state.FavoritePublishersReducer.isLoaded,
    exists: state.FavoritePublishersReducer.items.length > 0
  }
}

export default connect(mapStateToProps)(FavoritesScene)
