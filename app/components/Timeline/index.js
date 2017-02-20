import React, { Component, PropTypes } from 'react'
import { ListView, RefreshControl } from 'react-native'
import StoryContainer from '../../containers/StoryContainer'
import ListViewHeader from '../ListViewHeader'
import styles from './styles'

class Timeline extends Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
    this.scrollToY = this.scrollToY.bind(this)
  }

  renderSectionHeader (sectionData, date) {
    return <ListViewHeader date={date} />
  }

  dataSource () {
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2
    })

    let { rows, sections } = this.rowsAndSections()
    return ds.cloneWithRowsAndSections(rows, sections)
  }

  rowsAndSections () {
    let rows = {}
    let sections = []

    const { items } = this.props.data

    if (!items || !items.length) return { rows, sections }

    items.forEach(item => {
      const { date, stories } = item
      if (!stories.length) return
      sections.push(date)
      rows[date] = stories
    })

    return { rows, sections }
  }

  refreshControl () {
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

  render () {
    const { items } = this.props.data
    if (!items || !items.length) return null

    return (
      <ListView
        collapsable={false}
        dataSource={this.dataSource()}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={200}
        pageSize={4}
        ref={'timeline'}
        refreshControl={this.refreshControl()}
        renderFooter={this.props.renderFooter}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
        style={styles.listView}
      />
    )
  }

  renderRow (story) {
    return (
      <StoryContainer
        key={story.id}
        story={story}
        scrollToY={this.scrollToY}
        timelineRef={this.refs.timeline}
        collapsable={false}
      />
    )
  }

  scrollToY (y) {
    return this.refs.timeline.scrollTo({ x: 0, y, animated: true })
  }
}

Timeline.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    pullToRefresh: PropTypes.func.isRequired
  }).isRequired,
  onEndReached: PropTypes.func.isRequired,
  renderFooter: PropTypes.func.isRequired
}

export default Timeline
