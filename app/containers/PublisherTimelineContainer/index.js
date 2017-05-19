import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import withQuery from './index.gql'
import TimelineContainer from '../TimelineContainer'
import styles from '../../styles/App'

class PublisherTimeline extends Component {
  render () {
    return (
      <View style={styles.listViewContainer}>
        <TimelineContainer type='publisher' data={this.props.data} />
      </View>
    )
  }
}

PublisherTimeline.propTypes = {
  data: PropTypes.object,
  publisher: PropTypes.shape({
    slug: PropTypes.string.isRequired
  }).isRequired
}

export default withQuery(PublisherTimeline)
