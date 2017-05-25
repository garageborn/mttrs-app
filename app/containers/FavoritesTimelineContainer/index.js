import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import TimelineContainer from '../TimelineContainer'
import styles from '../../styles/App'

class FavoritesTimelineContainer extends Component {
  render () {
    const { data, favoritePublishers } = this.props
    if (!favoritePublishers.isLoaded) return this.renderLoading()

    return (
      <View style={styles.listViewContainer}>
        <TimelineContainer data={data} />
      </View>
    )
  }

  renderLoading () {
    return (
      <View>
        <ActivityIndicator size='large' color='#AAA' />
      </View>
    )
  }
}

FavoritesTimelineContainer.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired
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
      categoryId: state.FavoritesReducer.categoryId,
      publisherId: state.FavoritesReducer.publisherId
    }
  }
}

const FavoritesTimelineContainerWithData = withQuery(FavoritesTimelineContainer)
export default connect(mapStateToProps)(FavoritesTimelineContainerWithData)
