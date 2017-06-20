import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AddFavoritesListContainer from '../AddFavoritesListContainer'

class OnboardingAddFavoritesContainer extends Component {
  shouldComponentUpdate (nextProps) {
    return this.props.favoritePublishers.isComplete !== nextProps.favoritePublishers.isComplete
  }

  render () {
    const { favoritePublishers, onComplete } = this.props
    return (
      <AddFavoritesListContainer
        onComplete={onComplete}
        isComplete={favoritePublishers.isComplete}
      />
    )
  }
}

OnboardingAddFavoritesContainer.propTypes = {
  favoritePublishers: PropTypes.shape({
    isComplete: PropTypes.bool.isRequired
  }).isRequired,
  onComplete: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    favoritePublishers: {
      isComplete: state.FavoritePublishersReducer.items.length > 0
    }
  }
}

export default connect(mapStateToProps)(OnboardingAddFavoritesContainer)
