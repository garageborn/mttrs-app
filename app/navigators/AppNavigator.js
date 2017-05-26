import { StackNavigator } from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import MainNavigator from './MainNavigator'
import PublisherScene from '../scenes/PublisherScene'
import SettingsScene from '../scenes/SettingsScene'
import LinkScene from '../scenes/LinkScene'

const AppRoutes = {
  publisher: { screen: PublisherScene },
  link: { screen: LinkScene },
  settings: { screen: SettingsScene },
  timeline: { screen: MainNavigator }
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
