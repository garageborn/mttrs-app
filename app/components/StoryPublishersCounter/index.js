import React from 'react'
import { Image, Text, View } from 'react-native'
import styles from './styles'

const StoryPublishersCounter = ({ count }) => {
  if (!count) return (
    <View style={styles.container}>
      <View />
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>+{count}</Text>
      </View>
    </View>
  )
}

export default StoryPublishersCounter
