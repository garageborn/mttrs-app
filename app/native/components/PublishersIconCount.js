import React from 'react'
import { View, Text, Image } from 'react-native'

const PublishersIconCount = ({ styles, links }) => {
  if (!links) return

  if (links.length === 1) {
    return (
      <View style={styles.publisher}>
        <Image style={styles.publisherLogo} source={require('../assets/nyt.png')} />
      </View>
    )
  }

  return (
    <View style={styles.publisher}>
      <Image style={styles.publisherLogo} source={require('../assets/nyt.png')} />
      <Text style={styles.publisherTitle}>+{links.length - 1}</Text>
    </View>
  )
}

export default PublishersIconCount
