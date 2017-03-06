import React, { Component, PropTypes } from 'react'
import { View, Text, ListView } from 'react-native'
import _isEmpty from 'lodash/isEmpty'
import PublisherMenuItem from '../PublisherMenuItem'
import styles from './styles'

class PublisherMenuListView extends Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.renderSeparator = this.renderSeparator.bind(this)
  }

  componentWillUpdate (nextProps) {
    if (this.props.query !== nextProps.query) {
      this.rowsAndSections(nextProps.query)
    }
  }

  render () {
    let { publishers } = this.props
    if (!publishers || !publishers.length) return

    return (
      <View style={styles.listContainer}>
        <ListView
          dataSource={this.dataSource()}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSeparator}
        />
      </View>
    )
  }

  renderSeparator (sectionData, section) {
    return (
      <View shadowOffset={{width: 1, height: 2}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1}>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>{section}</Text>
        </View>
      </View>
    )
  }

  renderRow (publisher) {
    return <PublisherMenuItem key={publisher.id} publisher={publisher} onPress={this.props.openPublisher} />
  }

  dataSource () {
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2
    })

    let { rows, sections } = this.rowsAndSections(this.props.query)
    return ds.cloneWithRowsAndSections(rows, sections)
  }

  rowsAndSections (query) {
    let rows = {}
    let sections = []
    const { publishers } = this.props

    if (!publishers || !publishers.length) return {rows, sections}

    const queryMatcher = new RegExp(query, 'i')
    const filteredPublishers = publishers.filter(publisher => {
      return publisher.name.match(queryMatcher) || publisher.slug.match(queryMatcher)
    })
    //
    // console.log('PUBLISHERS', filteredPublishers)
    //
    if (_isEmpty(filteredPublishers)) this.props.hasPublishers()

    filteredPublishers.map(publisher => {
      let section = this.getSection(publisher)
      if (sections.indexOf(section) === -1) {
        sections.push(section)
        rows[section] = []
      }
      rows[section].push(publisher)
    })

    return { rows, sections }
  }

  getSection (publisher) {
    return publisher.slug.substring(0, 1).toUpperCase()
  }
}

PublisherMenuListView.propTypes = {
  publishers: PropTypes.array.isRequired,
  openPublisher: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
}

export default PublisherMenuListView
