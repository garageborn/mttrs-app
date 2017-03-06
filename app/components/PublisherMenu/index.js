import React, { Component, PropTypes } from 'react'
import { View, ActivityIndicator } from 'react-native'
import _debounce from 'lodash/debounce'
import ApolloError from '../ApolloError'
import PublisherSearch from '../PublisherSearch'
import PublisherMenuListView from '../PublisherMenuListView'
import PublisherMenuSuggestion from '../PublisherMenuSuggestion'
import styles from './styles'

class PublisherMenu extends Component {
  constructor () {
    super()

    this.state = {
      query: '',
      hasPublishers: true
    }

    this.onCleanSearch = this.onCleanSearch.bind(this)
    this.hasPublishers = this.hasPublishers.bind(this)
  }

  renderError () {
    return <ApolloError skinType='dark' data={this.props.data} />
  }

  inputIsEmpty () {
    return this.state.query === ''
  }

  hasPublishers () {
    this.setState({ hasPublishers: false })
  }

  renderView () {
    const { publishers } = this.props.data
    if (this.state.hasPublishers) {
      return (
        <PublisherMenuListView
          query={this.state.query}
          hasPublishers={this.hasPublishers}
          publishers={publishers}
          openPublisher={this.props.openPublisher}
        />
      )
    } else {
      return (
        <PublisherMenuSuggestion
          publisher={this.state.query}
          sendSuggestion={() => console.log(123)}
        />
      )
    }
  }

  renderListView () {
    const { publishers } = this.props.data
    console.log(this.state.hasPublishers)
    if (!this.state.hasPublishers) return

    return (
      <PublisherMenuListView
        query={this.state.query}
        hasPublishers={this.hasPublishers}
        publishers={publishers}
        openPublisher={this.props.openPublisher}
      />
    )
  }

  renderSuggestionView () {
    if (this.state.hasPublishers) return

    return (
      <PublisherMenuSuggestion
        publisher={this.state.query}
        sendSuggestion={() => console.log(123)}
      />
    )
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
        <PublisherSearch
          onChangeText={this.onChangeText()}
          onCleanSearch={this.onCleanSearch}
          inputIsEmpty={this.inputIsEmpty()}
        />
        {/* <PublisherMenuListView
          query={this.state.query}
          hasPublishers={this.hasPublishers}
          publishers={publishers}
          openPublisher={this.props.openPublisher}
        /> */}
        {this.renderView()}
      </View>
    )
  }

  onChangeText () {
    return _debounce(query => this.setState({ query }), 300)
  }

  onCleanSearch () {
    this.setState({ query: '' })
  }
}

PublisherMenu.propTypes = {
  data: PropTypes.object.isRequired,
  openPublisher: PropTypes.func.isRequired
}

export default PublisherMenu
