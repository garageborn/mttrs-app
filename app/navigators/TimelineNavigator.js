/* eslint-disable react/prop-types */
import React from 'react'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import PopularScene from '../scenes/PopularScene'
import SummariesScene from '../scenes/SummariesScene'
import FavoritesScene from '../scenes/FavoritesScene'
import PopularTabBar from '../components/PopularTabBar'
import SummariesTabBar from '../components/SummariesTabBar'
import FavoritesTabBar from '../components/FavoritesTabBar'
import styles from '../styles/TabBarBottom'

const TimelineRoutes = {
  summaries: {
    screen: SummariesScene,
    navigationOptions: {
      tabBarLabel: ({ focused }) => <SummariesTabBar focused={focused} />
    }
  },
  popular: {
    screen: PopularScene,
    navigationOptions: {
      tabBarLabel: ({ focused }) => <PopularTabBar focused={focused} />,
      header: null
    }
  },
  favorites: {
    screen: FavoritesScene,
    navigationOptions: {
      tabBarLabel: ({ focused }) => <FavoritesTabBar focused={focused} />
    }
  }
}

const TimelineNavigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'summaries',
  swipeEnabled: false,
  tabBarComponent: ({ ...props }) => <TabBarBottom style={styles} {...props} />,
  tabBarPosition: 'bottom',
  lazy: true,
  animationEnabled: false
}

const TimelineNavigator = TabNavigator(TimelineRoutes, TimelineNavigatorConfig)

export default TimelineNavigator
