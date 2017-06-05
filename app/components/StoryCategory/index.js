import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

const StoryCategory = ({ category, visited }) => {
  const containerStyles = visited ? [styles.container, styles.visited] : styles.container

  return (
    <View style={containerStyles}>
      <Text style={styles.text}>
        <Text style={[...styles.category, { color: category.color }]}>
          {category.name.toUpperCase()}
        </Text>
      </Text>
    </View>
  )
}

StoryCategory.propTypes = {
  visited: PropTypes.bool.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string
  }).isRequired
}

export default StoryCategory
