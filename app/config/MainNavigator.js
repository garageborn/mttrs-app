import React from 'react'
import Timeline from '../scenes/Timeline'
import Publisher from '../scenes/Publisher'
import Summaries from '../scenes/Summaries'
import Popular from '../scenes/Popular'
import Favorites from '../scenes/Favorites'
import Link from '../scenes/Link'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'

const MainContentRoutes = {
  summaries: { screen: Timeline },
  popular: { screen: Popular },
  favorites: { screen: Favorites }
}

const MainContentNavigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'summaries',
  tabBarComponent: ({ ...props }) => <TabBarBottom {...props} />,
  animationEnabled: true,
  tabBarPosition: 'bottom'
}

export const MainContentNavigator = TabNavigator(MainContentRoutes, MainContentNavigatorConfig)

const AppRoutes = {
  publisher: { screen: Publisher },
  link: { screen: Link },
  settings: { screen: Timeline },
  timeline: { screen: MainContentNavigator }
}

export const AppNavigator = StackNavigator(AppRoutes, { headerMode: 'none', initialRouteName: 'timeline' })

export default AppNavigator
