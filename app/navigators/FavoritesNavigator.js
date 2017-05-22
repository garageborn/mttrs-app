import { StackNavigator } from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import FavoritePublishersScene from '../scenes/FavoritePublishersScene'
import FavoritesTimelineScene from '../scenes/FavoritesTimelineScene'
import ManageFavoritesScene from '../scenes/ManageFavoritesScene'

const AppRoutes = {
  timeline: { screen: FavoritesTimelineScene },
  publishers: { screen: FavoritePublishersScene },
  manage: { screen: ManageFavoritesScene }
}

const AppNavigatorConfig = {
  direction: 'horizontal',
  headerMode: 'none',
  initialRouteName: 'timeline',
  transitionConfig: () => ({
    screenInterpolator: CardStackStyleInterpolator.forHorizontal
  })
}

export default StackNavigator(AppRoutes, AppNavigatorConfig)
