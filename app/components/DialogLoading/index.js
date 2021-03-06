import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import styles from './styles'

const DialogLoading = () => (
  <View style={styles.container}>
    <ActivityIndicator size='small' color='#AAA' />
  </View>
)

export default DialogLoading
