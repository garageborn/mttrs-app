import React, { Component, PropTypes } from 'react'
import { SectionList } from 'react-native'
import StoryContainer from '../../containers/StoryContainer'
import ListViewHeader from '../ListViewHeader'

class TimelineList extends Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
  }

  renderSectionHeader (item) {
    return <ListViewHeader date={item.section.key} />
  }

  sections () {
    const { items } = this.props.data

    if (!items || !items.length) return []

    return items.map(item => {
      const { date, stories } = item
      if (!stories.length) return
      return { key: date, data: stories }
    })
  }

  render () {
    const { items } = this.props.data
    if (!items || !items.length) return null

    return (
      <SectionList
        ListFooterComponent={this.props.renderFooter}
        keyExtractor={this.extractKey}
        onEndReached={this.props.onEndReached}
        refreshControl={this.props.refreshControl()}
        renderItem={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
        sections={this.sections()}
      />
    )
  }

  extractKey (item, index) {
    return item.id + index
  }

  renderRow (section) {
    const story = section.item
    return (
      <StoryContainer
        key={story.id}
        story={story}
        collapsable={false}
      />
    )
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
