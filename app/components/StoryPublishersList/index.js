import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'

const StoryPublishersList = ({ publishers }) => {
  return (
    <View style={styles.container}>
      {publishers}
    </View>
  )
}

StoryPublishersList.propTypes = {
  publishers: PropTypes.array.isRequired
}

export default StoryPublishersList
