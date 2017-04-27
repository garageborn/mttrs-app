import React, { Component, PropTypes } from 'react'
import { SectionList } from 'react-native'
import _isEqual from 'lodash/isEqual'
import StoryContainer from '../../containers/StoryContainer'
import ListViewHeader from '../ListViewHeader'
import TimelineAdContainer from '../../containers/TimelineAdContainer'

class TimelineList extends Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (_isEqual(this.props.data.items, nextProps.data.items)) return null
  }

  renderSectionHeader (item) {
    return <ListViewHeader date={item.section.key} />
  }

  sections () {
    const { items } = this.props.data

    if (!items || !items.length) return []

    return items.map(item => {
      const { date, stories } = item
      return { key: date, data: stories }
    })
  }

  render () {
    const { items } = this.props.data
    if (!items || !items.length) return null

    return (
      <SectionList
        keyExtractor={this.extractKey}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={200}
        refreshControl={this.props.refreshControl()}
        renderFooter={this.props.renderFooter}
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
    let components = [
      <StoryContainer key={story.id} story={story} collapsable={false} />
    ]
    if (section.index === 3) components.push(<TimelineAdContainer key={'timelineAd'} />)
    return components
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
