import { TabNavigator } from 'react-navigation'
import PopularTabBarNavigator from '../components/PopularTabBarNavigator'
import PopularTimelineScene from '../scenes/PopularTimelineScene'
import CategoryTimelineScene from '../scenes/CategoryTimelineScene'
import PublishersScene from '../scenes/PublishersScene'

const buildRoutes = (categories) => {
  let categoryRoutes = {}
  categories.forEach((category) => {
    categoryRoutes[category.slug] = {
      screen: CategoryTimelineScene,
      navigationOptions: {
        tabBarLabel: category.name
      }
    }
  })

  return {
    home: {
      screen: PopularTimelineScene
    },
    ...categoryRoutes,
    publishers: { screen: PublishersScene }
  }
}

const config = {
  ...TabNavigator.Presets.AndroidTopTabs,
  tabBarComponent: PopularTabBarNavigator,
  headerMode: 'none',
  tabBarPosition: 'top',
  lazy: true,
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    scrollEnabled: true,
    tabStyle: {
      width: undefined
    }
  }
}

export default (categories) => {
  return TabNavigator(buildRoutes(categories), config)
}
