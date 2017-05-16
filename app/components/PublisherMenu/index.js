import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import PublisherSearch from '../PublisherSearch'
import PublisherMenuListView from '../PublisherMenuListView'
import PublisherMenuSuggestionTrigger from '../PublisherMenuSuggestionTrigger'
import PublisherMenuSuggestionContainer from '../../containers/PublisherMenuSuggestionContainer'
import styles from './styles'

class PublisherMenu extends Component {
  constructor () {
    super()

    this.handleSuggestionTrigger = this.handleSuggestionTrigger.bind(this)

    this.state = {
      suggestion: false
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <PublisherSearch
            handleQuery={this.props.handleQuery}
            emptyInput={this.props.emptyInput}
            suggestion={this.state.suggestion}
          />
          <PublisherMenuSuggestionTrigger
            handlePress={this.handleSuggestionTrigger}
            active={this.state.suggestion}
          />
        </View>
        {this.renderView()}
      </View>
    )
  }

  handleSuggestionTrigger () {
    return this.setState({ suggestion: !this.state.suggestion })
  }

  renderSuggestionView () {
    return (
      <PublisherMenuSuggestionContainer
        query={this.props.query}
        publisher={this.props.query}
      />
    )
  }

  renderView () {
    const { publishers } = this.props
    if (!publishers.length || this.state.suggestion) return this.renderSuggestionView()
    return (
      <PublisherMenuListView
        hasPublishers={this.hasPublishers}
        publishers={publishers}
        openPublisher={this.props.openPublisher}
      />
    )
  }
}

PublisherMenu.propTypes = {
  query: PropTypes.string.isRequired,
  publishers: PropTypes.array.isRequired,
  openPublisher: PropTypes.func.isRequired,
  emptyInput: PropTypes.func.isRequired,
  handleQuery: PropTypes.func.isRequired
}

export default PublisherMenu
