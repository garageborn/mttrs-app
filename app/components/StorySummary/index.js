/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import Touchable from '../Touchable'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const StorySummary = ({ onPress, story }) => (
  <View style={styles.container}>
    <Touchable underlayColor={WHITE_TRANSPARENT_COLOR} onPress={e => onPress()}>
      <View style={styles.box}>
        <View style={styles.headlineContainer}>
          <Text style={styles.headline}>{story.headline}</Text>
        </View>
        <Text style={styles.summary}>{story.summary}</Text>
      </View>
    </Touchable>
  </View>
)

StorySummary.propTypes = {
  onPress: PropTypes.func.isRequired,
  story: PropTypes.shape({
    headline: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired
  }).isRequired
}

export default StorySummary
