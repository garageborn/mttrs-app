import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as TimelineActions from '../../actions/TimelineActions'
import Timeline from '../components/Timeline'

class TimelineContainer extends Component {
  static fetchData({dispatch, categorySlug}) {
    let options = {
      category_slug: categorySlug
    }
    return dispatch(TimelineActions.getTimeline(options))
  }

  render() {
    const { items, isFetching } = this.props
    return (
      <Timeline items={items} isFetching={isFetching} />
    )
  }
}

export default connect(state => state.TimelineReducers)(TimelineContainer)
