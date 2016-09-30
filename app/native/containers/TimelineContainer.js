import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { TimelineActions } from '../actions/index'
import Timeline from '../components/Timeline'
import StoryContainer from './StoryContainer'
import StoryLinksContainer from './StoryLinksContainer'
import Router from '../config/Router'
import { NavigationActions } from '@exponent/ex-navigation'

class TimelineContainer extends Component {
  constructor(props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.onPullToRefresh = this.onPullToRefresh.bind(this)
    this.renderStory = this.renderStory.bind(this)
  }

  componentDidMount() {
    this.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    let nextSection = nextProps.params.section || {}
    let currentSection = this.props.params.section || {}

    let sectionNameChanged = nextSection.name !== currentSection.name
    let sectionModelChanged = nextSection.model !== currentSection.model
    if (sectionNameChanged && sectionModelChanged) this.fetchData(nextProps)
  }

  fetchData(props) {
    let action = TimelineActions.getTimeline(this.fetchQuery(props))
    return props.dispatch(action)
  }

  pullFetchData(props) {
    // let action = TimelineActions.pullToRefresh(this.fetchQuery(props))
    // return props.dispatch(action)
  }

  infiniteFetchData(props) {
    // let action = TimelineActions.infiniteToRefresh(this.fetchQuery(props))
    // return props.dispatch(action)
  }

  fetchQuery(props) {
    const { section } = props.params
    if (!section) return {}
    switch(section.name) {
      case 'category':
        return { category_slug: section.model.slug }
      case 'publisher':
        return { publisher_slug: section.model.slug }
    }
  }

  onPullToRefresh() {
    this.pullFetchData(this.props)
  }

  onEndReached() {
    this.infiniteFetchData(this.props)
  }

  render() {
    const { items, isFetching, isFetchingTop } = this.props
    return (
      <View>
        { this.renderStoryLinks() }
        <Timeline
          items={items}
          isFetching={isFetching}
          isFetchingTop={isFetchingTop}
          onEndReached={this.onEndReached}
          onRefresh={this.onPullToRefresh}
          storyRenderer={this.renderStory}
          />
        </View>
    )
  }

  renderStory(story) {
    return <StoryContainer story={story} params={this.props.params}/>
  }

  renderStoryLinks() {
    const { params } = this.props
    let section = params.section || {}
    let storyLinks = section.storyLinks || {}
    if (!storyLinks.open) return
    return <StoryLinksContainer params={params} story={storyLinks.story}/>
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
