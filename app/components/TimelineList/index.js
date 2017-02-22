import React, { Component, PropTypes } from 'react'
import { ListView } from 'react-native'
import _isEqual from 'lodash/isEqual'
import StoryContainer from '../../containers/StoryContainer'
import ListViewHeader from '../ListViewHeader'

class TimelineList extends Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
    this.scrollToY = this.scrollToY.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    return !_isEqual(this.props.data.items, nextProps.data.items)
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
        refreshControl={this.props.refreshControl()}
        renderFooter={this.props.renderFooter}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
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

TimelineList.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.array.isRequired
  }).isRequired,
  onEndReached: PropTypes.func.isRequired,
  refreshControl: PropTypes.func.isRequired,
  renderFooter: PropTypes.func.isRequired
}

export default TimelineList
