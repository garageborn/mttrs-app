import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Text, View } from 'react-native'
import { NavigationActions } from '../../actions/index'
import Touchable from '../../components/Touchable'

import FavoriteCategoriesDialogContainer from '../../containers/FavoriteCategoriesDialogContainer'
import FavoritesTimelineContainer from '../../containers/FavoritesTimelineContainer'
import FavoritePublishersSelectorContainer from '../../containers/FavoritePublishersSelectorContainer'

class FavoritesTimelineScene extends Component {
  render () {
    return (
      <View>
        <FavoriteCategoriesDialogContainer />
        <FavoritePublishersSelectorContainer />
        <Touchable onPress={()=>this.props.dispatch(NavigationActions.addFavorites())}>
          <Text>AddFuckingPublishers</Text>
        </Touchable>
        <FavoritesTimelineContainer />
      </View>
    )
  }
}

// export default FavoritesTimelineScene
export default connect()(FavoritesTimelineScene)
