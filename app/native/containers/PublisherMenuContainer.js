import React, { Component } from 'react'
import { View, Text, Image, TextInput, ListView } from 'react-native'
import { connect } from 'react-redux'
import PublisherMenuItem from '../components/PublisherMenuItem'
import styles from '../styles/MenuPublishers'
import * as PublishersActions from '../../actions/PublishersActions'
import { NavigationActions } from '@exponent/ex-navigation'

class PublisherMenuContainer extends Component {
  constructor() {
    super()
    this.renderRow = this.renderRow.bind(this)
    this.renderSeparator = this.renderSeparator.bind(this)
    this.openPublisher = this.openPublisher.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(PublishersActions.getPublishers())
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
    let { publishers } = this.props
    let rows = {}
    let sections = []

    publishers.forEach(publisher => {
      let section = publisher.name.substring(0, 1).toUpperCase()
      if (sections.indexOf(section) === -1) {
        sections.push(section)
        rows[section] = []
      }
      rows[section].push(publisher)
    })

    return {rows, sections}
  }

  renderSeparator(sectionData, section) {
    return (
      <View shadowOffset={{width: 1, height: 2}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1}>
        <Text style={styles.listHeader}>{section}</Text>
      </View>
    )
  }

  renderRow(publisher) {
    return <PublisherMenuItem publisher={publisher} onPress={this.openPublisher} />
  }

  render() {
    if (!this.props.publishers.length) {
      return (
        <View style={styles.container}>
          <Text>Hang on...</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        { this.renderSearch() }
        { this.renderList() }
      </View>
    )
  }

  renderSearch() {
    return (
      <View>
        <View style={{marginBottom: 14, height: 1}} shadowOffset={{width: 1, height: 2}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1.2} />
        <View style={styles.search} shadowOffset={{width: 1, height: 2}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1.0}>
          <Image style={styles.searchIcon} source={require('../assets/icons/icon-search.png')} />
          <TextInput style={styles.searchInput} placeholder='Search for publishers' />
        </View>
      </View>
    )
  }

  renderList() {
    return (
      <View style={styles.listContainer}>
        <ListView
          style={styles.listView}
          dataSource={this.dataSource()}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSeparator}
          />
      </View>
    )
  }

  openPublisher(publisher) {
    const { dispatch, navigation, params } = this.props
    let menuParams = params ? params.menu : {}
    menuParams.open = false
    let sectionParams = { name: 'publisher', model: publisher }
    let newParams = Object.assign({}, params, { section: sectionParams, menu: menuParams })
    dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))
  }
}

let mapStateToProps = (state) => {
  return {
    publishers: state.PublishersReducers.publishers,
    navigation: state.navigation
  }
}
export default connect(mapStateToProps)(PublisherMenuContainer)
