import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

const PopularTab = ({ active, content }) => {
  const containerStyles = () => {
    // if (active) return styles.activeContainer
    return styles.container
  }

  const textStyles = () => {
    // if (active) return [styles.activeText, {color: content.color}]
    return styles.text
  }

  return (
    <View style={containerStyles()}>
      <Text style={textStyles()}>{content.name}</Text>
    </View>
  )
}

PopularTab.propTypes = {
  active: PropTypes.bool.isRequired,
  content: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired
}

export default PopularTab
