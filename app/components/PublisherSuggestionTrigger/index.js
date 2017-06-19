import React, { PropTypes } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import styles from './styles.js'

const PublisherSuggestionTrigger = ({ active, onPress }) => {
  const getStyles = () => {
    if (active) return [styles.container, styles.active]
    return styles.container
  }

  return (
    <TouchableHighlight style={getStyles()} onPress={onPress}>
      <View>
        <Text style={styles.text}>+</Text>
      </View>
    </TouchableHighlight>
  )
}

PublisherSuggestionTrigger.propTypes = {
  active: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
}

export default PublisherSuggestionTrigger
