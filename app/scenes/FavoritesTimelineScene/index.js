import React, { Component } from 'react'
import { View } from 'react-native'
import FavoriteCategoriesDialogContainer from '../../containers/FavoriteCategoriesDialogContainer'
import FavoritesTimelineContainer from '../../containers/FavoritesTimelineContainer'
import FavoritePublishersSelectorContainer from '../../containers/FavoritePublishersSelectorContainer'

class FavoritesTimelineScene extends Component {
  render () {
    return (
      <View>
        <FavoriteCategoriesDialogContainer />
        <FavoritePublishersSelectorContainer />
        <FavoritesTimelineContainer />
      </View>
    )
  }
}

export default FavoritesTimelineScene
