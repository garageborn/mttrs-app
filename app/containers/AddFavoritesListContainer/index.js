import React, { Component, PropTypes } from 'react'
import _isEqual from 'lodash/isEqual'
import withQuery from './index.gql'
import AddFavoritesLoading from '../../components/AddFavoritesLoading'
import AddFavoritesList from '../../components/AddFavoritesList'

class AddFavoritesListContainer extends Component {
  shouldComponentUpdate (nextProps) {
    const loadingChanged = this.props.data.loading !== nextProps.data.loading
    const publishersChanged = !_isEqual(this.props.data.publishers, nextProps.data.publishers)
    const isCompleteChanged = this.props.isComplete !== nextProps.isComplete
    return loadingChanged || publishersChanged || isCompleteChanged
  }

  render () {
    const { data, isComplete, onComplete } = this.props
    const { loading, publishers } = data
    if (loading) return this.renderLoading()

    return (
      <AddFavoritesList
        onComplete={onComplete}
        isComplete={isComplete}
        publishers={publishers}
      />
    )
  }

  renderLoading () {
    return <AddFavoritesLoading />
  }
}

AddFavoritesListContainer.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    publishers: PropTypes.any
  }).isRequired,
  isComplete: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired
}

export default withQuery(AddFavoritesListContainer)
