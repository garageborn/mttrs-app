import React from 'react'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import PopularScene from '../scenes/PopularScene'
import SummariesScene from '../scenes/SummariesScene'
import FavoritesScene from '../scenes/FavoritesScene'
import PopularTabBar, { PopularTabBarIcon } from '../components/PopularTabBar'
import SummariesTabBar, { SummariesTabBarIcon } from '../components/SummariesTabBar'
import FavoritesTabBar, { FavoritesTabBarIcon } from '../components/FavoritesTabBar'

const MainRoutes = {
  summaries: {
    screen: SummariesScene,
    navigationOptions: {
      tabBarLabel: <SummariesTabBar />,
      tabBarIcon: SummariesTabBarIcon
    }
  },
  popular: {
    screen: PopularScene,
    navigationOptions: {
      tabBarLabel: <PopularTabBar />,
      tabBarIcon: PopularTabBarIcon,
      header: null
    }
  },
  favorites: {
    screen: FavoritesScene,
    navigationOptions: {
      tabBarLabel: <FavoritesTabBar />,
      tabBarIcon: FavoritesTabBarIcon
    }
  }
}

const MainNavigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'summaries',
  swipeEnabled: false,
  tabBarComponent: ({ ...props }) => <TabBarBottom {...props} />,
  tabBarPosition: 'bottom',
  lazy: true
}

const MainNavigator = TabNavigator(MainRoutes, MainNavigatorConfig)

export const isCurrentRoute = (nav, routeName) => {
  const currentRoute = nav.routes[nav.index]
  if (currentRoute.routeName !== 'timeline') return false
  return currentRoute.routes[currentRoute.index].routeName === routeName
}

export default MainNavigator
