import React, { PropTypes } from 'react'
import { Image, Text, View } from 'react-native'
import styles from './styles'
import image from './assets/image.png'

const StoryPublishersCounter = ({ count }) => {
  console.log(count)
  if (count <= 0) {
    return (
      <View style={styles.container}>
        <Image source={image} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>+{count}</Text>
      </View>
    </View>
  )
}

StoryPublishersCounter.propTypes = {
  count: PropTypes.number.isRequired
}

export default StoryPublishersCounter
