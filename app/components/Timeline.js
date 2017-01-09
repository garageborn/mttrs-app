import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Platform, ListView, View, Text, RefreshControl, ActivityIndicator } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import _sortBy from 'lodash/sortBy'
import _uniqBy from 'lodash/uniqBy'
import styles from '../styles/App'
import StoryContainer from '../containers/StoryContainer'
import Story from './Story'
import ListViewHeader from './ListViewHeader'
import ParseDate from '../common/utils/ParseDate'
import analytics from '../config/Analytics'

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.scrollToY = this.scrollToY.bind(this)
    this.state = {
      loadingMore: false
    }
  }

  componentWillMount() {
    this.trackHome()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.storiesWillChange(nextProps)
  }

  storiesWillChange(nextProps) {
    if (!this.props.data.timeline) return true
    const thisStoriesIds = this.props.data.timeline.map((item) => item.id)
    const nextStoriesIds = nextProps.data.timeline.map((item) => item.id)
    return thisStoriesIds !== nextStoriesIds
  }

  componentWillReceiveProps(nextProps) {
    const renderCategory = nextProps.type === 'category'
    const renderPublisher = nextProps.type === 'publisher'
    if (renderCategory || renderPublisher) return this.trackSection(nextProps.type, nextProps.filter)
  }

  trackHome() {
    analytics.page({
      anonymousId: '1', //TODO: Figure this out better!
      name: 'home'
    })
  }

  trackSection(type, filter) {
    analytics.page({
      anonymousId: '1', //TODO: Figure this out better!
      name: type,
      properties: {
        title: filter.name
      }
    })
  }

  renderSectionHeader(sectionData, date) {
    return <ListViewHeader date={ParseDate(date)} />
  }

  dataSource() {
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2
    })

    let { rows, sections } = this.rowsAndSections()
    return ds.cloneWithRowsAndSections(rows, sections)
  }

  rowsAndSections() {
    let rows = {}
    let sections = []
    const { timeline } = this.props.data

    timeline.forEach(item => {
      if (item.stories.length) {
        let section = item.date
        sections.push(section)
        rows[section] = item.stories
      }
    })

    return {rows, sections}
  }

  refreshControl() {
    const { loading, pullToRefresh } = this.props.data
    return (
      <RefreshControl
        style={styles.hideRefreshControl}
        refreshing={loading}
        onRefresh={pullToRefresh}
        tintColor='#DDD'
        title='Refreshing...'
        titleColor='#AAA'
        progressBackgroundColor='#FFF'
       />
    )
  }

  render() {
    if (this.props.data.loading) return this.renderLoading()

    return (
      <ListView
        ref={'timeline'}
        removeClippedSubviews={false}
        initialListSize={4}
        style={styles.listView}
        dataSource={this.dataSource()}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
        refreshControl={this.refreshControl()}
        renderFooter={() => this.renderFooter()}
        onEndReached={() => this.onEndReached()}
      />
    )
  }

  onEndReached() {
    if (this.state.loadingMore) return
    const storiesArray = this.props.data.timeline.filter((item) => item.stories.length)
    const minStoriesInTheViewport = 3
    if (storiesArray.length < minStoriesInTheViewport) return
    //Reference: https://github.com/apollostack/react-apollo/issues/228
    this.setState({ loadingMore: true })
    this.props.data.infiniteScroll().then((data) => {
      this.setState({ loadingMore: false })
    })
  }

  renderFooter() {
    if (this.state.loadingMore) {
      return <View style={styles.infiniteScrollLoadingContainer}>{this.renderActivityIndicator()}</View>
    }
    return null
  }

  renderLoading() {
    return (
      <View style={styles.loading}>
        {this.renderActivityIndicator()}
      </View>
    )
  }

  renderActivityIndicator() {
    return <ActivityIndicator size='large' color='#AAA'/>
  }

  renderRow(story) {
    let isSceneHome = this.props.type === 'home'
    return <StoryContainer key={story.id} story={story} isSceneHome={isSceneHome} scrollToY={this.scrollToY}/>
  }

  scrollToY(y) {
    return this.refs.timeline.scrollTo({x: 0, y, animated: true})
  }
}

Timeline.propTypes = {
  category: PropTypes.object
}

let mapStateToProps = (state, ownProps) => {
  return {
    uiReducer: state.uiReducer,
    TimelineReducers: state.TimelineReducers
  }
}

const Query = gql`
  query($days: Int!, $offset: Int, $timezone: String, $perDay: Int!, $categorySlug: String, $publisherSlug: String) {
    timeline(days: $days, offset: $offset, timezone: $timezone) {
      date
      stories(limit: $perDay, popular: true, category_slug: $categorySlug, publisher_slug: $publisherSlug) {
        id
        total_social
        headline
        summary
        main_category { name color slug }
        main_link(publisher_slug: $publisherSlug) {
          title
          url
          image_source_url
          publisher { name icon_id }
        }
        other_links(publisher_slug: $publisherSlug) {
          id
        }
      }
    }
  }
`

const defaultVariables = {
  categorySlug: '',
  days: 7,
  offset: 0,
  perDay: 10,
  publisherSlug: '',
  timezone
}

const pullToRefresh = ({ fetchMore, variables }) => {
  return fetchMore({
    variables: { ...variables, days: 1, offset: 0 },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult.data) { return previousResult }
      let timeline = fetchMoreResult.data.timeline.concat(previousResult.timeline)
      timeline = _uniqBy(timeline, item => item.date)
      timeline = _sortBy(timeline, item => -item.date)
      return Object.assign({}, previousResult, { timeline: [...timeline] })
    },
  })
}

const infiniteScroll = ({ fetchMore, variables, timeline }) => {
  return fetchMore({
    variables: { ...variables, days: 1, offset: timeline.length },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult.data) { return previousResult }
      let timeline = fetchMoreResult.data.timeline.concat(previousResult.timeline)
      return Object.assign({}, previousResult, {
        timeline: [...previousResult.timeline, ...fetchMoreResult.data.timeline]
      })
    }
  })
}

const TimelineWithData = graphql(Query, {
  options(props) {
    if (props.type === 'home') return { variables: defaultVariables }
    return {
      variables: {
        ...defaultVariables,
        publisherSlug: props.type === 'publisher' ? props.filter.slug : '',
        categorySlug: props.type === 'category' ? props.filter.slug : ''
      }
    }
  },
  props({ data }) {
    return {
      data: {
        ...data,
        pullToRefresh: pullToRefresh.bind(this, data),
        infiniteScroll: infiniteScroll.bind(this, data),
      }
    }
  }
})(Timeline)
export default connect(mapStateToProps)(TimelineWithData)
