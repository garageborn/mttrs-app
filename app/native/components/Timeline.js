import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Platform, ListView, View, Text, RefreshControl, ActivityIndicator } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import _sortBy from 'lodash/sortBy'
import _uniqBy from 'lodash/uniqBy'
import styles from '../styles/App'
import Story from './Story'
import ListViewHeader from './ListViewHeader'
import ParseDate from '../../common/utils/ParseDate'
import analytics from '../config/Analytics'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.state = {
      loadingMore: false
    }
  }

  componentWillMount() {
    this.trackTopStories()
  }

  componentWillReceiveProps(nextProps) {
    const renderCategory = nextProps.type === 'category'
    const renderPublisher = nextProps.type === 'publisher'
    if (renderCategory || renderPublisher) return this.trackSection(nextProps.type, nextProps.filter)
  }

  trackTopStories() {
    analytics.track({
      anonymousId: '1', //TODO: Figure this out better!
      event: 'Visit Top Stories'
    })
  }

  trackSection(type, filter) {
    let event = type === 'publisher' ? 'Visit Publisher' : 'Visit Category'
    analytics.track({
      anonymousId: '1', //TODO: Figure this out better!
      event,
      properties: {
        id: filter.id,
        name: filter.name,
        slug: filter.slug
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
    if (this.props.data.loading) {
      return this.renderLoading()
    }

    return (
      <ListView
        removeClippedSubviews={false}
        initialListSize={100}
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
    return <ActivityIndicator
      size='large'
      color='#AAA'
    />
  }

  renderRow(story) {
    let isSceneHome = this.props.type === 'home'
    return this.props.storyRenderer(story, isSceneHome)
  }
}

Timeline.propTypes = {
  category: PropTypes.object,
  storyRenderer: PropTypes.func.isRequired
}

let mapStateToProps = (state, ownProps) => {
  return {
    uiReducer: state.uiReducer,
    TimelineReducers: state.TimelineReducers
  }
}

const Query = gql`
  query($days: Int!, $offset: Int, $perDay: Int!, $categorySlug: String, $publisherSlug: String) {
    timeline(days: $days, offset: $offset) {
      date
      stories(limit: $perDay, popular: true, category_slug: $categorySlug, publisher_slug: $publisherSlug) {
        id
        total_social
        main_category { id name slug color }
        main_link(publisher_slug: $publisherSlug) {
          title
          image_source_url
          url
          total_social
          publisher { name slug icon_id }
        }
        other_links(publisher_slug: $publisherSlug, popular: true) {
          title
          url
          total_social
          publisher { name slug icon_id }
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
  publisherSlug: ''
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
