import React from 'react'
import FavoritePublishersContainer from '../../containers/FavoritePublishersContainer'
import FavoritesTitleContainer from '../../containers/FavoritesTitleContainer'
import FavoritesHeaderRight from '../../components/FavoritesHeaderRight'
import headerStyles from '../../styles/Header'

const FavoritePublishersScene = () => (
  <FavoritePublishersContainer />
)

FavoritePublishersScene.navigationOptions = props => {
  return {
    headerTitle: <FavoritesTitleContainer {...props} />,
    headerRight: <FavoritesHeaderRight />,
    ...headerStyles
  }
}

export default FavoritePublishersScene
