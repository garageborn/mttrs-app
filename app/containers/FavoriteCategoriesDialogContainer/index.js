import React, { Component, PropTypes } from 'react'
import { Modal, View } from 'react-native'
import { connect } from 'react-redux'
import CategoriesDialogContainer from '../CategoriesDialogContainer'
import { FavoritesActions, FavoritePublishersActions, NavigationActions } from '../../actions/index'
import styles from '../../styles/Modal'

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

    return (
      <Modal transparent visible onRequestClose={this.close}>
        <View style={styles.modal}>
          <CategoriesDialogContainer publisherIds={items} onPress={this.selectCategory} />
        </View>
      </Modal>
    )
  }

  selectCategory (category) {
    const { dispatch } = this.props
    dispatch(NavigationActions.closeModal())
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
