import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as TimelineActions from 'mttrs/app/actions/TimelineActions'
import Timeline from 'mttrs/app/web/components/Timeline'

class TimelineContainer extends Component {
  static fetchData({ dispatch, route }) {
    let categorySlug = route.categorySlug
    // let filter = route.filter

    let options = {}
    if (categorySlug) options.category_slug = categorySlug
    // if (filter) options[filter] = true

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
