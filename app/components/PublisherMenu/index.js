import React, { Component, PropTypes } from 'react'
import { View, ActivityIndicator } from 'react-native'
import _debounce from 'lodash/debounce'
import ApolloError from '../ApolloError'
import PublisherSearch from '../PublisherSearch'
import PublisherMenuListView from '../PublisherMenuListView'
import styles from './styles'

class PublisherMenu extends Component {
  constructor () {
    super()

    this.state = { query: '' }
  }

  renderError () {
    return <ApolloError skinType='dark' data={this.props.data} />
  }

  render () {
    const { loading, error, publishers } = this.props.data
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
        <PublisherSearch onChangeText={_debounce(query => this.setState({ query }), 300)} />
        <PublisherMenuListView
          query={this.state.query}
          publishers={publishers}
          openPublisher={this.props.openPublisher}
        />
      </View>
    )
  }
}

PublisherMenu.propTypes = {
  data: PropTypes.object.isRequired,
  openPublisher: PropTypes.func.isRequired
}

export default PublisherMenu
