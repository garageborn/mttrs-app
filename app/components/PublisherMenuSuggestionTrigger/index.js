import React, { PropTypes } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import styles from './styles.js'

const PublisherMenuSuggestionTrigger = ({ active, handlePress }) => {
  const getStyles = () => {
    if (active) return [styles.container, styles.active]
    return styles.container
  }
  return (
    <TouchableHighlight style={getStyles()} onPress={handlePress}>
      <View>
        <Text style={styles.text}>+</Text>
      </View>
    </TouchableHighlight>
  )
}

PublisherMenuSuggestionTrigger.propTypes = {
  handlePress: PropTypes.func
}

export default PublisherMenuSuggestionTrigger
