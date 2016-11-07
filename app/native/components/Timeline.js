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

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
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
    const { onEndReached } = this.props

    if (this.props.data.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator
            size='large'
            color='#AAA'
          />
        </View>
      )
    }

    return (
      <ListView
        removeClippedSubviews={false}
        initialListSize={100}
        style={styles.listView}
        dataSource={this.dataSource()}
        renderRow={this.props.storyRenderer}
        renderSectionHeader={this.renderSectionHeader}
        refreshControl={this.refreshControl()}
        onEndReached={onEndReached}
      />
    )
  }
}

Timeline.propTypes = {
  category: PropTypes.object,
  onEndReached: PropTypes.func.isRequired,
  storyRenderer: PropTypes.func.isRequired
}

let mapStateToProps = (state, ownProps) => {
  return {
    uiReducer: state.uiReducer
  }
}

const Query = gql`
  query($days: Int!, $offset: Int, $perDay: Int!, $categorySlug: String, $publisherSlug: String) {
    timeline(days: $days, offset: $offset) {
      date
      stories(limit: $perDay, popular: true, category_slug: $categorySlug, publisher_slug: $publisherSlug) {
        id
        total_social
        main_category { name slug color }
        main_link {
          title
          image_source_url
          url
          publisher { name icon_id }
        }
        other_links {
          title
          publisher { name icon_id }
        }
      }
    }
  }
`

const defaultVariables = {
  categorySlug: '',
  days: 7,
  offset: 0,
  perDay: 1,
  publisherSlug: ''
}

const pullToRefresh = function({ fetchMore, variables }) {
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

const TimelineWithData = graphql(Query, {
  options(props) {
    if (props.type === 'home') return { variables: defaultVariables }
    return {
      variables: {
        ...defaultVariables,
        publisherSlug: props.type === 'publisher' ? props.filter : '',
        categorySlug: props.type === 'category' ? props.filter.slug : ''
      }
    }
  },
  props({ data: { loading, timeline, variables, fetchMore } }) {
    return {
      data: {
        loading,
        timeline,
        fetchMore,
        pullToRefresh: pullToRefresh.bind(this, { fetchMore, variables })
      }
    }
  }
})(Timeline)
export default connect(mapStateToProps)(TimelineWithData)
