import React, { Component, PropTypes } from 'react'
import { View, ListView } from 'react-native'
import PublisherMenuItem from '../PublisherMenuItem'
import PublisherMenuListViewSeparator from '../PublisherMenuListViewSeparator'
import styles from './styles'

class PublisherMenuListView extends Component {
  constructor () {
    super()

    this.renderRow = this.renderRow.bind(this)
    this.renderSeparator = this.renderSeparator.bind(this)
  }

  render () {
    let { publishers } = this.props
    if (!publishers || !publishers.length) return

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.dataSource()}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSeparator}
        />
      </View>
    )
  }

  renderSeparator (sectionData, section) {
    return <PublisherMenuListViewSeparator section={section} />
  }

  renderRow (publisher) {
    return <PublisherMenuItem key={publisher.id} publisher={publisher} onPress={this.props.openPublisher} />
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
    const { publishers } = this.props

    let rows = {}
    let sections = []

    publishers.map(publisher => {
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
  openPublisher: PropTypes.func.isRequired
}

export default PublisherMenuListView
