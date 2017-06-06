import React, { PropTypes } from 'react'
import { View } from 'react-native'
import TimelineContainer from '../../containers/TimelineContainer'
import styles from './styles'

const CategoryTimeline = ({ data }) => (
  <View style={styles.container}>
    <TimelineContainer data={data} />
  </View>
)

CategoryTimeline.propTypes = {
  data: PropTypes.object.isRequired
}

export default CategoryTimeline
