import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as TimelineActions from '../../actions/TimelineActions'
import Timeline from '../components/Timeline'

class TimelineContainer extends Component {
  static fetchData(props) {
    let action = TimelineActions.getTimeline(this.fetchQuery(props))
    return props.dispatch(action)
  }

  static pullFetchData(props) {
    let action = TimelineActions.pullToRefresh(this.fetchQuery(props))
    return props.dispatch(action)
  }

  static infiniteFetchData(props) {
    let action = TimelineActions.infiniteToRefresh(this.fetchQuery(props))
    return props.dispatch(action)
  }

  static fetchQuery(props) {
    return {
      category_slug: props.currentCategory.slug,
      publisher_slug: props.currentPublisher.slug
    }
  }

  constructor(props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.onPullToRefresh = this.onPullToRefresh.bind(this)
    this.openStory = this.openStory.bind(this)
    this.openStoryLinks = this.openStoryLinks.bind(this)
  }

  componentDidMount() {
    this.constructor.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    let categoryChanged = nextProps.currentCategory.id !== this.props.currentCategory.id
    if (categoryChanged) this.constructor.fetchData(nextProps)
  }

  onPullToRefresh() {
    this.constructor.pullFetchData(this.props)
  }

  onEndReached() {
    this.constructor.infiniteFetchData(this.props)
  }

  openStory(story) {
    Actions.story({ story: story })
  }

  openStoryLinks(story) {
    Actions.storyLinks({ story: story })
  }

  render() {
    const { items, isFetching, isFetchingTop } = this.props
    return (
      <Timeline
        items={items}
        isFetching={isFetching}
        isFetchingTop={isFetchingTop}
        onEndReached={this.onEndReached}
        onRefresh={this.onPullToRefresh}
        openStory={this.openStory}
        openStoryLinks={this.openStoryLinks}
        />
    )
  }
}

let mapStateToProps = (state) => {
  return {
    items: state.TimelineReducers.items,
    isFetching: state.TimelineReducers.isFetching,
    isFetchingTop: state.TimelineReducers.isFetchingTop,
    currentCategory: state.CurrentCategoryReducer.category,
    currentPublisher: state.CurrentPublisherReducer.publisher
  }
}

export default connect(mapStateToProps)(TimelineContainer)
