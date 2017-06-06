import React, { PropTypes } from 'react'
import { View } from 'react-native'
import TimelineContainer from '../../containers/TimelineContainer'
import styles from './styles'

const FavoritesTimeline = ({ data }) => (
  <View style={styles.container}>
    <TimelineContainer data={data} />
  </View>
)

FavoritesTimeline.propTypes = {
  data: PropTypes.object.isRequired
}

export default FavoritesTimeline
