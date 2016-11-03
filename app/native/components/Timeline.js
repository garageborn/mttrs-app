import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Platform, ListView, View, Text, RefreshControl, ActivityIndicator } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { TimelineActions } from '../actions/index'
import styles from '../styles/App'
import Story from './Story'
import ListViewHeader from './ListViewHeader'
import ParseDate from '../../common/utils/ParseDate'


class Timeline extends Component {
  constructor(props) {
    super(props)
    console.warn('Timeline.constructor')
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
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
    console.log('render', this.props.data)
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
  onRefresh: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
  storyRenderer: PropTypes.func.isRequired
}

let mapStateToProps = (state, ownProps) => {
  console.log('===============state', state)
  return {
    uiReducer: state.uiReducer
  }
}

const Query = gql`
  query($categorySlug: String) {
    timeline(days: 5, offset: 25) {
      date
      stories(limit: 1, popular: true, category_slug: $categorySlug) {
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
    let { index } = props.navigationState
    let route = props.navigationState.routes[index]
    console.info('TimelineWithData request', props, route)
    if (!route.category) return {}
    return { variables: { categorySlug: route.category.slug } }
  }
})(Timeline)
export default connect(mapStateToProps)(TimelineWithData)
