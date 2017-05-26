import React from 'react'
import { View } from 'react-native'
import HeaderSettingsButton from '../HeaderSettingsButton'
import HeaderFilterButton from '../HeaderFilterButton'
import styles from './styles'

const FavoritesHeaderRight = () => (
  <View style={styles.container}>
    <HeaderFilterButton />
    <HeaderSettingsButton />
  </View>
)

export default FavoritesHeaderRight
