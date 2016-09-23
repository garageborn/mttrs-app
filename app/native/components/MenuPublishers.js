import React, { Component } from 'react'
import { View, Text, Image, TextInput, ListView } from 'react-native'
import Publisher from './MenuPublisherItem'
import styles from '../styles/MenuPublishers'

class MenuPublishers extends Component {
  // Just for the prototype's sake
  constructor() {
    super()
    this.getPublisherItem = this.getPublisherItem.bind(this)
    this.renderSeparator = this.renderSeparator.bind(this)
  }

  dataSource() {
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2
    })

    let { rows, sections } = this.rowsAndSections()
    return ds.cloneWithRowsAndSections(rows, sections)
  }

  rowsAndSections() {
    let items = [
      {
        section: 'A',
        publishers: ['Forbes', 'NYT', 'BBC', 'CNN']
      },
      {
        section: 'B',
        publishers: ['Forbes', 'NYT', 'BBC']
      },
      {
        section: 'C',
        publishers: ['Forbes', 'NYT', 'BBC', 'CNN']
      }
    ]
    let rows = {}
    let sections = []
    items.forEach(item => {
      let section = item.section
      sections.push(section)
      rows[section] = item.publishers
    })

    return {rows, sections}
  }

  renderSeparator(sectionData, section) {
    return (
      <View shadowOffset={{width: 1, height: 2}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1.0}>
        <Text style={styles.listHeader}>{section}</Text>
      </View>
    )
  }

  getPublisherItem(item) {
    return <Publisher name={item} />
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 14, height: 1}} shadowOffset={{width: 1, height: 2}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1.2} />
        <View style={styles.search} shadowOffset={{width: 1, height: 2}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1.0}>
          <Image style={styles.searchIcon} source={require('../assets/icons/icon-search.png')} />
          <TextInput style={styles.searchInput} placeholder='Search for publishers' />
        </View>

        <View style={styles.listContainer}>
          <ListView
            style={styles.listView}
            dataSource={this.dataSource()}
            renderRow={this.getPublisherItem}
            renderSectionHeader={this.renderSeparator}
            />
        </View>
      </View>
    )
  }
}

export default MenuPublishers
