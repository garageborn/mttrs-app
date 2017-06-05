/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import Touchable from '../Touchable'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const StorySummary = ({ onPress, story, visited }) => {
  const { headline, summary } = story

  const summaryStyles = () => {
    let summaryStyles = [styles.summary]
    if (visited) summaryStyles = [...summaryStyles, styles.summaryVisited]
    return summaryStyles
  }

  const headlineStyles = () => {
    if (!visited) return styles.headlineContainer
    return [styles.headlineContainer, styles.headlineVisited]
  }

  return (
    <View style={styles.container}>
      <Touchable underlayColor={WHITE_TRANSPARENT_COLOR} onPress={e => onPress()}>
        <View style={styles.box}>
          <View style={headlineStyles()}>
            <Text style={styles.headline}>{headline}</Text>
          </View>
          <Text style={summaryStyles()}>{summary}</Text>
        </View>
      </Touchable>
    </View>
  )
}

StorySummary.propTypes = {
  visited: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  story: PropTypes.shape({
    headline: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired
  }).isRequired
}

export default StorySummary
