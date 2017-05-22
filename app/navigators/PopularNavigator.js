import React from 'react'
import { TabNavigator, TabBarTop } from 'react-navigation'
import { View } from 'react-native'
import HomeTimeline from '../containers/HomeTimeline'

const buildRoutes = {
  home: { screen: HomeTimeline },
  teste2: { screen: HomeTimeline }
}

const config = {
  headerMode: 'none',
  tabBarPosition: 'top'
}

const buildNavigator = (props) => {
  const { categories } = props
  const navigator = TabNavigator(buildRoutes, config)
  return navigator
}

export default buildNavigator
