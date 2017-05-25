import React, { Component, PropTypes } from 'react'
import withQuery from './index.gql'
import TimelineContainer from '../TimelineContainer'

class PopularTimelineContainer extends Component {
  // shouldComponentUpdate (nextProps) {
  //   if (!this.props.data || !nextProps.data) return true
  //   if (this.props.data.loading !== nextProps.data.loading) return true
  //   return this.props.current
  // }

  render () {
    return <TimelineContainer data={this.props.data} />
  }
}

PopularTimelineContainer.propTypes = {
  data: PropTypes.object
}

const PopularTimelineContainerWithData = withQuery(PopularTimelineContainer)
export default PopularTimelineContainerWithData
