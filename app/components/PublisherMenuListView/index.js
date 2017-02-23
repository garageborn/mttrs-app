import React, { Component, PropTypes } from 'react'
import { View, Text, ListView } from 'react-native'
import PublisherMenuItem from '../PublisherMenuItem'
import styles from './styles'

class PublisherMenuListView extends Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.renderSeparator = this.renderSeparator.bind(this)

    this.state = { query: '' }
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

    let { rows, sections } = this.rowsAndSections(this.state.query)
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

    filteredPublishers.map(publisher => {
      let section = this.props.getSection(publisher)
      if (sections.indexOf(section) === -1) {
        sections.push(section)
        rows[section] = []
      }
      rows[section].push(publisher)
    })

    // const favoriteSectionIndex = sections.indexOf('isFavorite')
    //
    // if (favoriteSectionIndex !== -1) {
    //   sections = [
    //     'isFavorite',
    //     ...sections.slice(0, favoriteSectionIndex),
    //     ...sections.slice(favoriteSectionIndex + 1)
    //   ]
    //   return { rows, sections }
    // }

    return { rows, sections }
  }
}

PublisherMenuListView.propTypes = {
  publishers: PropTypes.array.isRequired
}

export default PublisherMenuListView
