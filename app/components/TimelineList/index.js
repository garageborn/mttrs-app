import React, { Component, PropTypes } from 'react'
import { SectionList } from 'react-native'
import _result from 'lodash/result'
import StoryContainer from '../../containers/StoryContainer'
import ListViewHeader from '../ListViewHeader'
import styles from './styles.js'

class TimelineList extends Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
  }

  renderSectionHeader (item) {
    return <ListViewHeader type={this.props.type} date={item.section.key} />
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
    return `story_${index}`
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
  renderFooter: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
}

export default TimelineList
