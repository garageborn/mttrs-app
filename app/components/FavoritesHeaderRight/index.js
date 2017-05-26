import React from 'react'
import { View } from 'react-native'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
import HeaderFilterFavoritesContainer from '../../containers/HeaderFilterFavoritesContainer'
import styles from './styles'

const FavoritesHeaderRight = () => (
  <View style={styles.container}>
    <HeaderFilterFavoritesContainer />
    <HeaderSettingsContainer />
  </View>
)

export default FavoritesHeaderRight
