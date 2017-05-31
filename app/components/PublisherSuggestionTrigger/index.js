import React, { PropTypes } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import styles from './styles.js'

const PublisherSuggestionTrigger = ({ active, handlePress }) => {
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

PublisherSuggestionTrigger.propTypes = {
  active: PropTypes.bool.isRequired,
  handlePress: PropTypes.func
}

export default PublisherSuggestionTrigger
