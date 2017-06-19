import React from 'react'
import { View } from 'react-native'
import PublisherLogo from '../PublisherLogo'
import styles from './styles'

const StoryPublishersItem = ({ source }) => {
  return (
    <View style={styles.container}>
      <PublisherLogo source={source} />
    </View>
  )
}

export default StoryPublishersItem
