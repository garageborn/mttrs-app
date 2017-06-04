import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

const StoryTitle = ({ visited, title }) => {
  const containerStyle = visited ? [styles.container, styles.visited] : styles.container

  return (
    <View style={containerStyle}>
      <Text style={styles.title} numberOfLines={4}>{title}</Text>
    </View>
  )
}

StoryTitle.propTypes = {
  title: PropTypes.string.isRequired,
  visited: PropTypes.bool.isRequired
}

export default StoryTitle
