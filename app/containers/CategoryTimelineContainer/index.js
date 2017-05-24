import React, { Component, PropTypes } from 'react'
import withQuery from './index.gql'
import TimelineContainer from '../TimelineContainer'

class CategoryTimelineContainer extends Component {
  render () {
    return <TimelineContainer data={this.props.data} />
  }
}

CategoryTimelineContainer.propTypes = {
  categorySlug: PropTypes.string.isRequired,
  data: PropTypes.object
}

export default withQuery(CategoryTimelineContainer)
