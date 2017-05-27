import React, { Component, PropTypes } from 'react'
import { Modal, View } from 'react-native'
import { connect } from 'react-redux'
import CategoriesDialogContainer from '../CategoriesDialogContainer'
import Dialog from '../../components/Dialog'
import { FavoritesActions, FavoritePublishersActions, NavigationActions } from '../../actions/index'

class FavoriteCategoriesDialogContainer extends Component {
  constructor () {
    super()
    this.close = this.close.bind(this)
    this.selectCategory = this.selectCategory.bind(this)
  }

  componentWillMount () {
    this.props.dispatch(FavoritePublishersActions.getPublishers())
  }

  render () {
    const { isLoaded, items } = this.props.favoritePublishers
    if (!isLoaded) return null

    return (
      <Modal transparent visible onRequestClose={this.close}>
        <Dialog closeDialog={this.close} >
          <CategoriesDialogContainer publisherIds={items} onPress={this.selectCategory} />
        </Dialog>
      </Modal>
    )
  }

  selectCategory (category) {
    const { dispatch } = this.props
    this.close()
    dispatch(FavoritesActions.selectCategory(category))
  }

  close () {
    const { dispatch } = this.props
    dispatch(NavigationActions.closeModal())
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
