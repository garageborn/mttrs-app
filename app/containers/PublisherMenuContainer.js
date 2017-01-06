import React, { Component } from 'react'
import { View, Text, Image, TextInput, ListView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { injectIntl, defineMessages } from 'react-intl'
import _debounce from 'lodash/debounce'
import _isNil from 'lodash/isNil'
import PublisherMenuItem from '../components/PublisherMenuItem'
import styles from '../styles/MenuPublishers'
import { NavigationActions, MenuActions } from '../actions/index'

const messages = defineMessages({
  searchPlaceholder: {
    id: 'search.placeholder',
    defaultMessage: 'Search for publishers'
  }
})

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
    const { publishers, loading } = this.props.data
    let rows = {}
    let sections = []
    const queryMatcher = new RegExp(query, 'i')
    const filteredPublishers = publishers.filter(publisher => publisher.name.match(queryMatcher))

    filteredPublishers.map(publisher => {
      let section = this.props.StorageReducer.favoritePublishers.items.indexOf(publisher.id) !== -1 ? 'isFavorite' : publisher.name.substring(0, 1).toUpperCase()
      if (sections.indexOf(section) === -1) {
        sections.push(section)
        rows[section] = []
      }
      rows[section].push(publisher)
    })

    const favoriteSectionIndex = sections.indexOf('isFavorite')

    if (favoriteSectionIndex !== -1) {
      sections = [
        'isFavorite',
        ...sections.slice(0, favoriteSectionIndex),
        ...sections.slice(favoriteSectionIndex + 1)
      ]
      return {rows, sections}
    }

    return {rows, sections}
  }


  renderSeparator(sectionData, section) {
    let renderSection = section === 'isFavorite'
      ? <Image source={require('../assets/starActive.png')} style={styles.listHeaderImage}/>
      : <Text style={styles.listHeaderText}>{section}</Text>

    return (
      <View shadowOffset={{width: 1, height: 2}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1}>
        <View style={styles.listHeader}>{renderSection}</View>
      </View>
    )
  }

  renderRow(publisher) {
    return <PublisherMenuItem key={publisher.id} publisher={publisher} onPress={this.openPublisher} />
  }

  render() {
    const { loading } = this.props.data
    if (loading) {
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
    const { formatMessage } = this.props.intl
    return (
      <View>
        <View style={{marginBottom: 14, height: 1}} shadowOffset={{width: 1, height: 2}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1.2} />
        <View style={styles.search} shadowOffset={{width: 1, height: 2}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1.0}>
          <Image style={styles.searchIcon} source={require('../assets/icons/icon-search.png')} />
          <TextInput
            style={styles.searchInput}
            underlineColorAndroid={'transparent'}
            placeholder={formatMessage(messages.searchPlaceholder)}
            onChangeText={_debounce((query) => this.setState({query}), 300)} />
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
    this.props.dispatch(MenuActions.retractMenu())
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    StorageReducer: state.StorageReducer
  }
}

const Query = gql`query { publishers(order_by_name: true) { id name slug icon_id } }`
const intlPublisherMenuContainer = injectIntl(PublisherMenuContainer)
const PublisherMenuContainerWithData = graphql(Query)(intlPublisherMenuContainer)
export default connect(mapStateToProps)(PublisherMenuContainerWithData)