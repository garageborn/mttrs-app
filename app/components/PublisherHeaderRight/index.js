import React from 'react'
import { View } from 'react-native'
import HeaderSettingsButton from '../HeaderSettingsButton'
import HeaderFavoriteButton from '../HeaderFavoriteButton'
import HeaderFilterButton from '../HeaderFilterButton'
import styles from './styles'

const PublisherHeaderRight = () => (
  <View style={styles.container}>
    <HeaderFilterButton />
    <HeaderFavoriteButton />
    <HeaderSettingsButton />
  </View>
)

export default PublisherHeaderRight
