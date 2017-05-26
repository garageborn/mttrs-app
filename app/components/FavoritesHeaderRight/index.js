import React from 'react'
import { View } from 'react-native'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
import HeaderFilterFavoriteCategoriesContainer from '../../containers/HeaderFilterFavoriteCategoriesContainer'
import styles from './styles'

const FavoritesHeaderRight = () => (
  <View style={styles.container}>
    <HeaderFilterFavoriteCategoriesContainer />
    <HeaderSettingsContainer />
  </View>
)

export default FavoritesHeaderRight
