import { TabNavigator } from 'react-navigation'
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
    // home: { screen: PopularTimelineScene },
    // ...categoryRoutes,
    publishers: { screen: PublishersScene }
  }
}

const config = {
  ...TabNavigator.Presets.AndroidTopTabs,
  headerMode: 'none',
  tabBarPosition: 'top',
  lazy: true,
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    scrollEnabled: true
  }
}

export default (categories) => {
  return TabNavigator(buildRoutes(categories), config)
}
