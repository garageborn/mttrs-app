import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CategoriesDialogContainer from '../CategoriesDialogContainer'
import { FavoritesActions, FavoritePublishersActions } from '../../actions/index'

class FavoriteCategoriesDialogContainer extends Component {
  constructor () {
    super()
    this.selectCategory = this.selectCategory.bind(this)
  }

  componentWillMount () {
    this.props.dispatch(FavoritePublishersActions.getPublishers())
  }

  render () {
    const { isLoaded, items } = this.props.favoritePublishers
    if (!isLoaded) return null

    return <CategoriesDialogContainer publisherIds={items} onPress={this.selectCategory} />
  }

  selectCategory (category) {
    const { dispatch } = this.props
    dispatch(FavoritesActions.selectCategory(category))
  }
}

FavoriteCategoriesDialogContainer.propTypes = {
  favoritePublishers: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired
  }).isRequired
}

let mapStateToProps = (state) => {
  return {
    favoritePublishers: {
      isLoaded: state.FavoritePublishersReducer.isLoaded,
      items: state.FavoritePublishersReducer.items
    }
  }
}

export default connect(mapStateToProps)(FavoriteCategoriesDialogContainer)
