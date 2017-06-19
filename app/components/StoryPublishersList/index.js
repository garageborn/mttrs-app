import React from 'react'
import { View } from 'react-native'
import styles from './styles'

const StoryPublishersList = ({ publishers }) => {
  return (
    <View style={styles.container}>
      {publishers}
    </View>
  )
}

export default StoryPublishersList
