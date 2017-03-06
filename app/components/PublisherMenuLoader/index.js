import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import styles from './styles'

const PublisherMenuLoader = () => (
  <View style={styles.container}>
    <ActivityIndicator size='large' color='#AAA' />
  </View>
)

export default PublisherMenuLoader
