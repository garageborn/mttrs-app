import React from 'react'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import PopularScene from '../scenes/PopularScene'
import SummariesScene from '../scenes/SummariesScene'
import FavoritesNavigator from './FavoritesNavigator'
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
      tabBarIcon: PopularTabBarIcon
    }
  },
  favorites: { screen: FavoritesNavigator,
    navigationOptions: {
      tabBarLabel: <FavoritesTabBar />,
      tabBarIcon: FavoritesTabBarIcon
    }
  }
}

const MainNavigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'summaries',
  tabBarComponent: ({ ...props }) => <TabBarBottom {...props} />,
  tabBarPosition: 'bottom',
  lazy: true
}

const MainNavigator = TabNavigator(MainRoutes, MainNavigatorConfig)

export default MainNavigator
