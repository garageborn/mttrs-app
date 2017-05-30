import React from 'react'
import { View } from 'react-native'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
import HeaderAddFavoritesButtonContainer from '../../containers/HeaderAddFavoritesButtonContainer'
import styles from './styles'

const FavoritePublishersHeaderRight = () => (
  <View style={styles.container}>
    <HeaderAddFavoritesButtonContainer />
    <HeaderSettingsContainer />
  </View>
)

export default FavoritePublishersHeaderRight
