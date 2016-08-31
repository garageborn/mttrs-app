import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as TimelineActions from '../../actions/TimelineActions'
import Timeline from '../components/Timeline'

class TimelineContainer extends Component {
  static fetchData({dispatch, currentCategory}) {
    let options = {
      category_slug: currentCategory.slug
    }
    return dispatch(TimelineActions.getTimeline(options))
  }

  static pullFetchData({dispatch, currentCategory}) {
    let options = {
      category_slug: currentCategory.slug,
      pullToRefresh: true
    }
    return dispatch(TimelineActions.getTimeline(options))
  }

  componentDidMount() {
    this.constructor.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    let categoryChanged = nextProps.currentCategory.id !== this.props.currentCategory.id
    if (categoryChanged) {
      if (this.props.isRefreshing) {
        this.constructor.pullFetchData(nextProps)
      } else {
        this.constructor.fetchData(nextProps)
      }
    }
  }

  onPullToRefresh() {
    this.constructor.pullFetchData(this.props)
  }

  render() {
    const { items, isFetching, isRefreshing } = this.props
    return (
      <Timeline
        items={items}
        isFetching={isFetching}
        isRefreshing={isRefreshing}
        onRefresh={this.onPullToRefresh.bind(this)} />
    )
  }
}

let mapStateToProps = (state) => {
  return {
    items: state.TimelineReducers.items,
    isFetching: state.TimelineReducers.isFetching,
    isRefreshing: state.TimelineReducers.isRefreshing,
    currentCategory: state.CurrentCategoryReducer.category
  }
}

export default connect(mapStateToProps)(TimelineContainer)
