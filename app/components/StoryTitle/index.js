import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

const StoryTitle = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title} numberOfLines={4}>{title}</Text>
  </View>
)

StoryTitle.propTypes = {
  title: PropTypes.string.isRequired
}

export default StoryTitle
