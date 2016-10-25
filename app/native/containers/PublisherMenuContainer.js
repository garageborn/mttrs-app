import React, { Component } from 'react'
import { View, Text, Image, TextInput, ListView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import PublisherMenuItem from '../components/PublisherMenuItem'
import styles from '../styles/MenuPublishers'
import { PublishersActions, NavigationActions, MenuActions } from '../actions/index'
import _debounce from 'lodash/debounce'
import _isNil from 'lodash/isNil'

class PublisherMenuContainer extends Component {
  constructor() {
    super()
    this.renderRow = this.renderRow.bind(this)
    this.renderSeparator = this.renderSeparator.bind(this)
    this.openPublisher = this.openPublisher.bind(this)
    this.state = {
      query: ''
    }
  }

  componentDidMount() {
    this.props.dispatch(PublishersActions.getPublishers({order_by_name: true}))
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.query !== nextState.query) {
      this.rowsAndSections(nextState.query)
    }
  }

  dataSource() {
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2
    })

    let { rows, sections } = this.rowsAndSections(this.state.query)
    return ds.cloneWithRowsAndSections(rows, sections)
  }

  rowsAndSections(query) {
    let { publishers } = this.props
    let rows = {}
    let sections = []

    if (!_isNil(publishers))
      Object.assign(publishers[0], { starred: true }) //Mock favorite publisher

    const queryMatcher = new RegExp(query, 'i')
    const filteredPublishers = publishers.filter(publisher => publisher.name.match(queryMatcher))

    filteredPublishers.forEach(publisher => {
      let section = publisher.starred ? 'starred' : publisher.name.substring(0, 1).toUpperCase()
      if (publisher.starred || sections.indexOf(section) === -1) {
        sections.push(section)
        rows[section] = []
      }
      rows[section].push(publisher)
    })

    return {rows, sections}
  }

  renderSeparator(sectionData, section) {
    let renderSection = section === 'starred'
      ? <Image source={require('../assets/star.png')} style={styles.listHeaderImage}/>
      : <Text style={styles.listHeaderText}>{section}</Text>

    return (
      <View shadowOffset={{width: 1, height: 2}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1}>
        <View style={styles.listHeader}>{renderSection}</View>
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
          <ActivityIndicator
            size="large"
            color="#AAA"
          />
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
          <TextInput style={styles.searchInput}
            placeholder='Search for publishers'
            onChangeText={_debounce((query) => this.setState({query}), 300)}
          />
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
    this.props.dispatch(NavigationActions.selectPublisher(publisher))
    this.props.dispatch(MenuActions.closeMenu())
  }
}

let mapStateToProps = (state) => {
  return {
    publishers: state.PublishersReducers.publishers
  }
}
export default connect(mapStateToProps)(PublisherMenuContainer)
