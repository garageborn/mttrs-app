import { StackNavigator } from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import MainNavigator, { isCurrentRoute as isCurrentTimelineRoute} from './MainNavigator'
import PublisherScene from '../scenes/PublisherScene'
import SettingsScene from '../scenes/SettingsScene'
import LinkScene from '../scenes/LinkScene'
import FavoritePublishersScene from '../scenes/FavoritePublishersScene'
import AddFavoritesScene from '../scenes/AddFavoritesScene'

const AppRoutes = {
  publisher: { screen: PublisherScene },
  link: { screen: LinkScene },
  settings: { screen: SettingsScene },
  timeline: { screen: MainNavigator },
  favoritePublishers: { screen: FavoritePublishersScene },
  addFavorites: { screen: AddFavoritesScene }
}

const AppNavigatorConfig = {
  direction: 'horizontal',
  initialRouteName: 'timeline',
  transitionConfig: () => ({
    screenInterpolator: CardStackStyleInterpolator.forHorizontal
  })
}

const AppNavigator = StackNavigator(AppRoutes, AppNavigatorConfig)

export const isCurrentRoute = (nav, routeName) => {
  const currentRoute = nav.routes[nav.index]
  if (currentRoute.routeName === 'timeline') return isCurrentTimelineRoute(nav, routeName)
  return currentRoute.routeName === routeName
}

export default AppNavigator
