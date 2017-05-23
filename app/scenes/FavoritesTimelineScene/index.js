import React, { Component } from 'react'
import { View } from 'react-native'
import FavoriteCategoriesDialogContainer from '../../containers/FavoriteCategoriesDialogContainer'
import FavoritesTimelineContainer from '../../containers/FavoritesTimelineContainer'

class FavoritesTimelineScene extends Component {
  render () {
    return (
      <View>
        <FavoriteCategoriesDialogContainer />
        <FavoritesTimelineContainer />
      </View>
    )
  }
}

export default FavoritesTimelineScene
