import React, { Component, PropTypes } from 'react'
import { View, Text, ListView, ActivityIndicator } from 'react-native'
import _debounce from 'lodash/debounce'
import PublisherSearch from '../PublisherSearch'
import styles from './styles'

class PublisherMenu extends Component {
  render () {
    const { loading, error } = this.props.data
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' color='#AAA' />
        </View>
      )
    }

    if (error) return this.renderError()

    return (
      <View style={styles.container}>
        {this.renderSearch()}
        {this.renderList()}
      </View>
    )
  }

  renderSearch () {
    return (
      <PublisherSearch onChangeText={_debounce(query => this.setState({ query }), 300)} />
    )
  }

  renderList () {
    let { publishers } = this.props.data
    if (!publishers || !publishers.length) return

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
}

export default PublisherMenu
