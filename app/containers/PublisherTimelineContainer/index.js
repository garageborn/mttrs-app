import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
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
  category: PropTypes.object,
  data: PropTypes.object,
  publisher: PropTypes.shape({
    slug: PropTypes.string.isRequired
  }).isRequired
}

let mapStateToProps = (state) => {
  return {
    category: state.PublishersReducer.category
  }
}

const PublisherTimelineWithQuery = withQuery(PublisherTimeline)
export default connect(mapStateToProps)(PublisherTimelineWithQuery)
