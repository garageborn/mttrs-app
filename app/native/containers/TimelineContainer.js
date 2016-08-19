import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getTimeline } from '../../actions/TimelineActions'
import Timeline from '../components/Timeline'

class TimelineContainer extends Component {
  static fetchData({dispatch, route}) {
    let options = {
      category_slug: route.categorySlug,
      filter: route.filter,
      publisher_slug: route.publisherSlug
    }
    return dispatch(getTimeline(options))
  }

  render() {
    const { items, isFetching } = this.props

    return (
      <Timeline items={items} isFetching={isFetching} />
    )
  }
}

export default connect(state => state.TimelineReducers)(TimelineContainer)
