import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'
import _result from 'lodash/result'
import withQuery from './index.gql'
import FavoritePublishersSelector from '../../components/FavoritePublishersSelector'

class FavoritePublishersSelectorContainer extends Component {
  render () {
    const { data, favorites } = this.props
    const loading = _result(data, 'loading')
    const publishers = _result(data, 'publishers')
    if (!favorites.isLoaded || loading) return this.renderLoading()

    return <FavoritePublishersSelector publishers={publishers} />
  }

  renderLoading () {
    return (
      <View>
        <ActivityIndicator size='large' color='#AAA' />
      </View>
    )
  }
}

FavoritePublishersSelectorContainer.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    publishers: PropTypes.any
  }),
  favorites: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired
  }).isRequired
}

let mapStateToProps = (state) => {
  return {
    favorites: {
      isLoaded: state.FavoritePublishersReducer.isLoaded,
      items: state.FavoritePublishersReducer.items
    }
  }
}

const FavoritePublishersSelectorContainerWithData = withQuery(FavoritePublishersSelectorContainer)
export default connect(mapStateToProps)(FavoritePublishersSelectorContainerWithData)
