import { StackNavigator } from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import FavoritePublishersScene from '../scenes/FavoritePublishersScene'
import FavoritesTimelineScene from '../scenes/FavoritesTimelineScene'
import AddFavoritesScene from '../scenes/AddFavoritesScene'
import FavoritesScene from '../scenes/FavoritesScene'

const FavoritesRoutes = {
  favorites: { screen: FavoritesScene },
  favoritesTimeline: { screen: FavoritesTimelineScene },
  favoritePublishers: { screen: FavoritePublishersScene },
  addFavorites: { screen: AddFavoritesScene }
}

const FavoritesNavigatorConfig = {
  direction: 'horizontal',
  headerMode: 'none',
  initialRouteName: 'favorites',
  transitionConfig: () => ({
    screenInterpolator: CardStackStyleInterpolator.forHorizontal
  })
}

export default StackNavigator(FavoritesRoutes, FavoritesNavigatorConfig)
