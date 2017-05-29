import React, { Component, PropTypes } from 'react'
import { View, SectionList } from 'react-native'
import PublisherSelectorListItem from '../PublisherSelectorListItem'
import PublisherSelectorSectionHeader from '../PublisherSelectorSectionHeader'
import styles from './styles'

class PublisherSelectorList extends Component {
  constructor () {
    super()

    this.shouldItemUpdate = this.shouldItemUpdate.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
  }

  render () {
    let { publishers } = this.props
    if (!publishers || !publishers.length) return null

    return (
      <View style={styles.container}>
        <SectionList
          keyExtractor={this.extractKey}
          sections={this.sections()}
          shouldItemUpdate={this.shouldItemUpdate}
          renderItem={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    )
  }

  extractKey (item, index) {
    return `publisher_${index}`
  }

  renderSectionHeader (sectionData) {
    return <PublisherSelectorSectionHeader section={sectionData.section.key} />
  }

  renderRow (publisher) {
    return <PublisherSelectorListItem key={publisher.item.id} publisher={publisher.item} onPress={this.props.openPublisher} />
  }

  sections () {
    const { publishers } = this.props

    let rows = {}
    let letters = []

    publishers.map(publisher => {
      let letter = this.getSection(publisher)
      if (letters.indexOf(letter) === -1) {
        letters.push(letter)
        rows[letter] = []
      }
      rows[letter].push(publisher)
    })

    return Object.keys(rows).map((key) => {
      return { 'key': key, 'data': rows[key] }
    })
  }

  shouldItemUpdate (props, nextProps) {
    return props.item.id !== nextProps.item.id
  }

  getSection (publisher) {
    return publisher.slug.substring(0, 1).toUpperCase()
  }
}

PublisherSelectorList.propTypes = {
  publishers: PropTypes.array.isRequired,
  openPublisher: PropTypes.func.isRequired
}

export default PublisherSelectorList
