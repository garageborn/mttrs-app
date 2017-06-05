import React, { Component, PropTypes } from 'react'
import _isEqual from 'lodash/isEqual'
import withQuery from './index.gql'
import AddFavoritesLoading from '../../components/AddFavoritesLoading'
import AddFavoritesList from '../../components/AddFavoritesList'

class AddFavoritesListContainer extends Component {
  shouldComponentUpdate (nextProps) {
    const loadingChanged = this.props.data.loading !== nextProps.data.loading
    const publishersChanged = !_isEqual(this.props.data.publishers, nextProps.data.publishers)
    return loadingChanged || publishersChanged
  }

  render () {
    const { loading, publishers } = this.props.data
    if (loading) return this.renderLoading()
    return <AddFavoritesList publishers={publishers} />
  }

  renderLoading () {
    return <AddFavoritesLoading />
  }
}

AddFavoritesListContainer.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    publishers: PropTypes.any
  }).isRequired
}

export default withQuery(AddFavoritesListContainer)
