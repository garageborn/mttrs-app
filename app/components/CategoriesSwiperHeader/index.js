import React from 'react'
import { TabBar } from 'react-native-tab-view'
import styles from './styles.js'

const CategoriesSwiperHeader = (props) => (
  <TabBar
    indicatorStyle={styles.indicator}
    labelStyle={styles.label}
    scrollEnabled
    style={styles.container}
    tabStyle={styles.tab}
    {...props}
  />
)

export default CategoriesSwiperHeader
