import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import styles from './styles'

const AddFavoritesLoading = () => (
  <View style={styles.container}>
    <ActivityIndicator size='large' color='#AAA' />
  </View>
)

export default AddFavoritesLoading
