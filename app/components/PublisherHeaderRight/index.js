import React from 'react'
import { View } from 'react-native'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
import HeaderFavoriteButton from '../HeaderFavoriteButton'
import HeaderFilterPublisherCategoriesContainer from '../../containers/HeaderFilterPublisherCategoriesContainer'
import styles from './styles'

const PublisherHeaderRight = () => (
  <View style={styles.container}>
    <HeaderFilterPublisherCategoriesContainer />
    <HeaderFavoriteButton />
    <HeaderSettingsContainer />
  </View>
)

export default PublisherHeaderRight
