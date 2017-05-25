import React from 'react'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import PopularScene from '../scenes/PopularScene'
import SummariesScene from '../scenes/SummariesScene'
import FavoritesNavigator from './FavoritesNavigator'

const MainRoutes = {
  summaries: { screen: SummariesScene },
  popular: { screen: PopularScene },
  favorites: { screen: FavoritesNavigator }
}

const MainNavigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'summaries',
  tabBarComponent: ({ ...props }) => <TabBarBottom {...props} />,
  tabBarPosition: 'bottom'
}

const MainNavigator = TabNavigator(MainRoutes, MainNavigatorConfig)

export default MainNavigator
