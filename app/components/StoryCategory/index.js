import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

const StoryTitle = ({category}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>In <Text style={{ color: category.color }}>{category.name}</Text></Text>
    </View>

  )
}

StoryTitle.propTypes = {
  category: PropTypes.object
}

export default StoryTitle
