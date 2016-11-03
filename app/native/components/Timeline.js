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
    console.log('rowsAndSections', this.props.data)
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
    const { onEndReached } = this.props

    console.log('render', this.props.data)
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
      <View>
        <Text style={{fontSize: 36}}>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Text>
        <ListView
          style={styles.listView}
          dataSource={this.dataSource()}
          renderRow={this.props.storyRenderer}

        />
      </View>
    )
  }
}

Timeline.propTypes = {
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
  query Batata($categorySlug: String) {
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
    if (!route.category) return {}
    return {
      variables: { categorySlug: route.category.slug }
    }
  },
  // props({ data: { loading, timeline } }) {
  //   console.log('props', timeline)
  //   return {
  //     data: {
  //       loading,
  //       timeline
  //     }
  //   }
  // }
})(Timeline)
export default connect(mapStateToProps)(TimelineWithData)
