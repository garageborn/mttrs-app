import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'
import _result from 'lodash/result'
import withQuery from './index.gql'
import FavoritePublishersSelector from '../../components/FavoritePublishersSelector'
import { NavigationActions } from '../../actions/index'

class FavoritePublishersSelectorContainer extends Component {
  constructor () {
    super()
    this.openPublisher = this.openPublisher.bind(this)
  }

  render () {
    const { data, favoritePublishers } = this.props
    const loading = _result(data, 'loading')
    const publishers = _result(data, 'publishers')
    if (!favoritePublishers.isLoaded || loading) return this.renderLoading()

    return <FavoritePublishersSelector publishers={publishers} openPublisher={this.openPublisher} />
  }

  renderLoading () {
    return (
      <View>
        <ActivityIndicator size='large' color='#AAA' />
      </View>
    )
  }

  openPublisher (publisher) {
    const { dispatch } = this.props
    dispatch(NavigationActions.publisher(publisher))
  }
}

FavoritePublishersSelectorContainer.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    publishers: PropTypes.any
  }),
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
    },
    favorites: {
      category: state.FavoritesReducer.category
    }
  }
}

const FavoritePublishersSelectorContainerWithData = withQuery(FavoritePublishersSelectorContainer)
export default connect(mapStateToProps)(FavoritePublishersSelectorContainerWithData)
