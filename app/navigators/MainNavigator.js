import React from 'react'
import PopularScene from '../scenes/PopularScene'
import SummariesScene from '../scenes/SummariesScene'
import FavoritesScene from '../scenes/FavoritesScene'
import TimelineScene from '../scenes/TimelineScene'
import { TabNavigator, TabBarBottom } from 'react-navigation'

const MainRoutes = {
  summaries: { screen: TimelineScene },
  popular: { screen: PopularScene },
  favorites: { screen: FavoritesScene }
}

const MainNavigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'summaries',
  tabBarComponent: ({ ...props }) => <TabBarBottom {...props} />,
  animationEnabled: true,
  tabBarPosition: 'bottom'
}

const MainNavigator = TabNavigator(MainRoutes, MainNavigatorConfig)

export default MainNavigator
