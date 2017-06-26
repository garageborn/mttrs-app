import { StackNavigator } from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import TimelineNavigator from './TimelineNavigator'
import PublisherScene from '../scenes/PublisherScene'
import SettingsScene from '../scenes/SettingsScene'
import LinkScene from '../scenes/LinkScene'
import FavoritePublishersScene from '../scenes/FavoritePublishersScene'
import AddFavoritesScene from '../scenes/AddFavoritesScene'
import CountrySelectorScene from '../scenes/CountrySelectorScene'

const AppRoutes = {
  publisher: { screen: PublisherScene },
  link: { screen: LinkScene },
  settings: { screen: SettingsScene },
  timeline: { screen: TimelineNavigator },
  favoritePublishers: { screen: FavoritePublishersScene },
  addFavorites: { screen: AddFavoritesScene },
  countrySelector: { screen: CountrySelectorScene }
}

const AppNavigatorConfig = {
  direction: 'horizontal',
  initialRouteName: 'timeline',
  transitionConfig: () => ({
    screenInterpolator: CardStackStyleInterpolator.forHorizontal
  })
}

const AppNavigator = StackNavigator(AppRoutes, AppNavigatorConfig)

export default AppNavigator
