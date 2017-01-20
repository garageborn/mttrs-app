import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

const StoryTitle = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={3}>{title}</Text>
    </View>
  )
}

StoryTitle.propTypes = {
  title: PropTypes.string
}

export default StoryTitle
