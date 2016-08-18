import React, { PropTypes } from 'react'
import {
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import styles from '../styles/app'

const Story = ({onClick, thumb, title, name}) => {
  return (
    <TouchableHighlight activeOpacity={0.7} underlayColor='white' onPress={onClick}>
      <View style={styles.story}>
        <Image source={{uri: thumb}} style={styles.storyThumb} />
        <View style={styles.storyTitleContainer}>
          <Text numberOfLines={3}>{title}</Text>
          <Text style={styles.storyInfo}>@4AM <Text style={styles.storyInfoFrom}>from</Text> {name}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

Story.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

export default Story
