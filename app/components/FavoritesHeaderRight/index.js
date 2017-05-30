import React from 'react'
import { View } from 'react-native'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
import HeaderFilterFavoriteCategoriesContainer from '../../containers/HeaderFilterFavoriteCategoriesContainer'
import HeaderAddFavoritesButtonContainer from '../../containers/HeaderAddFavoritesButtonContainer'
import styles from './styles'

const FavoritesHeaderRight = () => (
  <View style={styles.container}>
    <HeaderFilterFavoriteCategoriesContainer />
    <HeaderAddFavoritesButtonContainer />
    <HeaderSettingsContainer />
  </View>
)

export default FavoritesHeaderRight
