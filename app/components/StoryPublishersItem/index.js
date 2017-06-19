import React, { PropTypes } from 'react'
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

StoryPublishersItem.propTypes = {
  source: PropTypes.string.isRequired
}

export default StoryPublishersItem
