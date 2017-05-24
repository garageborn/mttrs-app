import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import FavoritePublishersList from '../../components/FavoritePublishersList'

class FavoritePublishersListContainer extends Component {
  shouldComponentUpdate (nextProps) {
    return this.props.data.loading !== nextProps.data.loading
  }

  render () {
    const { loading, publishers } = this.props.data
    if (loading) return this.renderLoading()
    return <FavoritePublishersList publishers={publishers} />
  }

  renderLoading () {
    return (
      <View>
        <ActivityIndicator size='large' color='#AAA' />
      </View>
    )
  }
}

FavoritePublishersListContainer.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    publishers: PropTypes.any
  }).isRequired,
  favorites: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    selected: PropTypes.any
  }).isRequired,
  publishersIds: PropTypes.array.isRequired
}

let mapStateToProps = (state) => {
  return {
    favorites: {
      isLoaded: state.FavoritePublishersReducer.isLoaded,
      items: state.FavoritePublishersReducer.items,
      selected: state.FavoritesReducer.publisherId
    }
  }
}

const FavoritePublishersListContainerWithData = withQuery(FavoritePublishersListContainer)
export default connect(mapStateToProps)(FavoritePublishersListContainerWithData)
