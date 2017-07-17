/* eslint-disable react/prop-types */
import React from 'react'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import PopularScene from '../scenes/PopularScene'
import PublishersScene from '../scenes/PublishersScene'
import FavoritesScene from '../scenes/FavoritesScene'
import PopularTabBar from '../components/PopularTabBar'
import PublishersTabBar from '../components/PublishersTabBar'
import FavoritesTabBar from '../components/FavoritesTabBar'
import styles from '../styles/TabBarBottom'

const TimelineRoutes = {
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
  },
  publishers: {
    screen: PublishersScene,
    navigationOptions: {
      tabBarLabel: ({ focused }) => <PublishersTabBar focused={focused} />
    }
  }
}

const TimelineNavigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'popular',
  swipeEnabled: false,
  tabBarComponent: ({ ...props }) => <TabBarBottom style={styles} {...props} />,
  tabBarPosition: 'bottom',
  lazy: true,
  animationEnabled: false
}

const TimelineNavigator = TabNavigator(TimelineRoutes, TimelineNavigatorConfig)

export default TimelineNavigator
