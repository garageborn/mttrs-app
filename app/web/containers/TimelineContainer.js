import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as TimelineActions from 'mttrs/app/actions/TimelineActions'
import Timeline from 'mttrs/app/web/components/Timeline'

class TimelineContainer extends Component {
  static fetchData({ dispatch, route }) {
    let options = {
      category_slug: route.categorySlug,
      filter: route.filter,
      publisher_slug: route.publisherSlug
    }
    return dispatch(TimelineActions.getTimeline(options))
  }

  render() {
    const {items, isFetching} = this.props
    return (
      <Timeline items={items} isFetching={isFetching} />
    )
  }
}

export default connect(state => state.TimelineReducers)(TimelineContainer)
