import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import TimelineContainer from '../TimelineContainer'

class PublisherTimeline extends Component {
  render () {
    const { data, publisher } = this.props
    const renderOptions = { timelineType: 'publisher', publisherSlug: publisher.slug }

    return <TimelineContainer data={data} renderOptions={renderOptions} />
  }
}

PublisherTimeline.propTypes = {
  selectedCategory: PropTypes.object,
  data: PropTypes.object,
  publisher: PropTypes.shape({
    slug: PropTypes.string.isRequired
  }).isRequired
}

let mapStateToProps = (state) => {
  return {
    selectedCategory: state.PublishersReducer.selectedCategory
  }
}

const PublisherTimelineWithQuery = withQuery(PublisherTimeline)
export default connect(mapStateToProps)(PublisherTimelineWithQuery)
