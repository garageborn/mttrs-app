import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AddFavoritesListContainer from '../AddFavoritesListContainer'
import updateCurrentScene from '../../common/utils/updateCurrentScene'

class AddFavoritesContainer extends Component {
  constructor () {
    super()
    this.onComplete = this.onComplete.bind(this)
    updateCurrentScene(this, 'addFavorites')
  }

  shouldComponentUpdate (nextProps) {
    return this.props.favoritePublishers.isComplete !== nextProps.favoritePublishers.isComplete
  }

  render () {
    const { isComplete } = this.props.favoritePublishers
    return <AddFavoritesListContainer onComplete={this.onComplete} isComplete={isComplete} />
  }

  onComplete () {
    const { navigation } = this.props
    navigation.goBack()
  }
}

AddFavoritesContainer.propTypes = {
  favoritePublishers: PropTypes.shape({
    isComplete: PropTypes.bool.isRequired
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    favoritePublishers: {
      isComplete: state.FavoritePublishersReducer.items.length > 0
    }
  }
}

export default connect(mapStateToProps)(AddFavoritesContainer)
