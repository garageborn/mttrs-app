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
        tabBarLabel: category
      }
    }
  })

  return {
    home: { screen: PopularTimelineScene },
    ...categoryRoutes,
    publishers: { screen: PublishersScene }
  }
}

const config = (categories) => {
  return {
    ...TabNavigator.Presets.AndroidTopTabs,
    tabBarOptions: {
      categories: categories
    },
    tabBarComponent: PopularTabBarNavigator,
    headerMode: 'none',
    tabBarPosition: 'top',
    lazy: true,
    swipeEnabled: true,
    animationEnabled: true
  }
}

export default (categories) => {
  return TabNavigator(buildRoutes(categories), config(categories))
}
