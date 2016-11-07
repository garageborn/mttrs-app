import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Platform, ListView, View, Text, RefreshControl, ActivityIndicator } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styles from '../styles/App'
import Story from './Story'
import ListViewHeader from './ListViewHeader'
import ParseDate from '../../common/utils/ParseDate'

class Timeline extends Component {
  constructor(props) {
    console.info('Timeline constructor', props)
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

    timeline.forEach((item) => {
      if (item.stories.length) {
        let section = item.date
        sections.push(section)
        rows[section] = item.stories
      }
    })

    return {rows, sections}
  }

  refreshControl() {
    return (
      <RefreshControl
        style={styles.hideRefreshControl}
        refreshing={this.props.data.loading}
        onRefresh={this.props.onRefresh}
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
            size="large"
            color="#AAA"
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
  onRefresh: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
  storyRenderer: PropTypes.func.isRequired
}

let mapStateToProps = (state, ownProps) => {
  return {
    uiReducer: state.uiReducer
  }
}

const Query = gql`
  query Timeline($categorySlug: String) {
    timeline(days: 7, offset: 0) {
      date
      stories(limit: 10, popular: true, category_slug: $categorySlug) {
        id
        total_social
        main_category { name color }
        main_link {
          title
          image_source_url
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
const TimelineWithData = graphql(Query, {
  options(props) {
    if (!props.category) return {}
    return {
      variables: { categorySlug: props.category.slug },
    }
  }
})(Timeline)
export default connect(mapStateToProps)(TimelineWithData)
