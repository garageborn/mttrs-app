import React, { Component, PropTypes } from 'react'
import { SectionList } from 'react-native'
import _result from 'lodash/result'
import StoryContainer from '../../containers/StoryContainer'
import ListViewHeader from '../ListViewHeader'
import TimelineAdContainer from '../../containers/TimelineAdContainer'
import styles from './styles.js'
const addPosition = 4

class TimelineList extends Component {
  constructor (props) {
    super(props)
    this.shouldItemUpdate = this.shouldItemUpdate.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
  }

  renderSectionHeader (item) {
    const { renderOptions } = this.props
    return <ListViewHeader renderOptions={renderOptions} date={item.section.key} />
  }

  sections () {
    const { items } = this.props.data

    if (!_result(items, 'length')) return []

    const sections = items.map(item => {
      const { date, stories } = item
      return { key: date, data: stories }
    })

    return sections.filter((item) => item.data.length)
  }

  render () {
    if (!this.props.data) return null
    const { items } = this.props.data
    if (!items || !items.length) return null

    return (
      <SectionList
        style={styles.container}
        shouldItemUpdate={this.shouldItemUpdate}
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

  shouldItemUpdate (props, nextProps) {
    return props.item.id !== nextProps.item.id
  }

  extractKey (item, index) {
    return `story_${index}`
  }

  renderRow (section) {
    const { renderOptions } = this.props
    const story = section.item

    let components = []
    if (this.hasAd(section.index)) components.push(<TimelineAdContainer key={'timelineAd'} />)
    components.push(
      <StoryContainer
        key={story.id}
        story={story}
        collapsable={false}
        renderOptions={renderOptions}
      />
    )
    return components
  }

  hasAd (index) {
    return index === addPosition - 1
  }
}

TimelineList.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.array.isRequired
  }).isRequired,
  onEndReached: PropTypes.func.isRequired,
  refreshControl: PropTypes.func.isRequired,
  renderFooter: PropTypes.func.isRequired,
  renderOptions: PropTypes.shape({
    timelineType: PropTypes.string,
    publisherSlug: PropTypes.string
  })
}

export default TimelineList
