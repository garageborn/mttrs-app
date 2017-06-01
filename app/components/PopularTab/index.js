import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

const PopularTab = ({ content }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{content.name}</Text>
    </View>
  )
}

PopularTab.propTypes = {
  content: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired
}

export default PopularTab
