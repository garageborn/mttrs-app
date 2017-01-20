import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

const StoryCategory = ({category}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        in <Text style={[styles.category, { color: category.color }]}>
          {category.name.toUpperCase()}
        </Text>
      </Text>
    </View>

  )
}

StoryCategory.propTypes = {
  category: PropTypes.object
}

export default StoryCategory
