import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import withQuery from './index.gql'
import TimelineContainer from '../TimelineContainer'
import styles from '../../styles/App'

class PublisherTimeline extends Component {
  render () {
    const { data, publisher } = this.props
    const renderOptions = { timelineType: 'publisher', publisherSlug: publisher.slug }

    return (
      <View style={styles.listViewContainer}>
        <TimelineContainer data={data} renderOptions={renderOptions} />
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
