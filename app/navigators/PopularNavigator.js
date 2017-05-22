import React from 'react'
import { TabNavigator, TabBarTop } from 'react-navigation'
import PopularTimelineScene from '../scenes/PopularTimelineScene'

const buildRoutes = (categories) => {
  let routes = categories.map((category) => ({
    [category['name']]: { screen: PopularTimelineScene, params: { slug: category.slug }}
  }))

  routes = Object.assign(...routes)

  return {
    home: { screen: PopularTimelineScene },
    ...routes
  }
}

const config = {
  headerMode: 'none',
  tabBarPosition: 'top'
}

export default (categories) => {
  const navigator = TabNavigator(buildRoutes(categories), config)
  return navigator
}
