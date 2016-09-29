import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as TimelineActions from '../../actions/TimelineActions'
import Timeline from '../components/Timeline'
import Router from '../config/Router'
import { NavigationActions } from '@exponent/ex-navigation'

class TimelineContainer extends Component {
  constructor(props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.onPullToRefresh = this.onPullToRefresh.bind(this)
    this.openLink = this.openLink.bind(this)
    this.openStoryLinks = this.openStoryLinks.bind(this)
  }

  componentDidMount() {
    this.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    // let categoryChanged = nextProps.currentCategory.id !== this.props.currentCategory.id
    // if (categoryChanged) this.fetchData(nextProps)
  }

  fetchData(props) {
    let action = TimelineActions.getTimeline(this.fetchQuery(props))
    return props.dispatch(action)
  }

  pullFetchData(props) {
    let action = TimelineActions.pullToRefresh(this.fetchQuery(props))
    return props.dispatch(action)
  }

  infiniteFetchData(props) {
    let action = TimelineActions.infiniteToRefresh(this.fetchQuery(props))
    return props.dispatch(action)
  }

  fetchQuery(props) {
    console.log('fetchQuery', props)
    return {}
    // return {
    //   category_slug: props.currentCategory.slug,
    //   publisher_slug: props.currentPublisher.slug
    // }
  }

  onPullToRefresh() {
    this.pullFetchData(this.props)
  }

  onEndReached() {
    this.infiniteFetchData(this.props)
  }

  openLink(link) {
    const { dispatch, navigation } = this.props
    let route = Router.getRoute('link', { link: link })
    dispatch(NavigationActions.push(navigation.currentNavigatorUID, route))
  }

  openStoryLinks(story) {
    const { dispatch, navigation } = this.props
    let route = Router.getRoute('storyLinks', { story: story })
    dispatch(NavigationActions.push(navigation.currentNavigatorUID, route))
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
        openLink={this.openLink}
        openStoryLinks={this.openStoryLinks}
        />
    )
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    items: state.TimelineReducers.items,
    isFetching: state.TimelineReducers.isFetching,
    isFetchingTop: state.TimelineReducers.isFetchingTop,
    navigation: state.navigation
  }
}

export default connect(mapStateToProps)(TimelineContainer)
