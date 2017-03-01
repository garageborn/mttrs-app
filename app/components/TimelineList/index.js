import React, { Component, PropTypes } from 'react'
import { ListView } from 'react-native'
import _isEqual from 'lodash/isEqual'
import StoryContainer from '../../containers/StoryContainer'
import ListViewHeader from '../ListViewHeader'

class TimelineList extends Component {
  constructor (props) {
    super(props)
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = { dataSource: ds }
    this.renderRow = this.renderRow.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
    this.scrollToY = this.scrollToY.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (_isEqual(this.props.data.items, nextProps.data.items)) return

    this.updateDataSource(nextProps)
  }

  componentWillMount () {
    this.updateDataSource(this.props)
  }

  updateDataSource (props) {
    let { rows, sections } = this.rowsAndSections(props)
    return this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(rows, sections)
    })
  }

  renderSectionHeader (sectionData, date) {
    return <ListViewHeader date={date} />
  }

  rowsAndSections (props) {
    let rows = {}
    let sections = []

    const { items } = props.data

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
        dataSource={this.state.dataSource}
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
