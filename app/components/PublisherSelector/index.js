import React, { Component, PropTypes } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import PublisherSearch from '../PublisherSearch'
import PublisherSelectorList from '../PublisherSelectorList'
import PublisherSuggestionTrigger from '../PublisherSuggestionTrigger'
import PublisherSuggestionContainer from '../../containers/PublisherSuggestionContainer'
import styles from './styles'

class PublisherSelector extends Component {
  constructor () {
    super()
    this.handleSuggestionTrigger = this.handleSuggestionTrigger.bind(this)
    this.state = { suggestion: false }
  }

  render () {
    const { emptyInput, handleQuery } = this.props
    const { suggestion } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <PublisherSearch
            handleQuery={handleQuery}
            emptyInput={emptyInput}
            suggestion={suggestion}
          />
          <PublisherSuggestionTrigger
            handlePress={this.handleSuggestionTrigger}
            active={suggestion}
          />
        </View>
        {this.renderListView()}
      </View>
    )
  }

  handleSuggestionTrigger () {
    return this.setState({ suggestion: !this.state.suggestion })
  }

  renderSuggestionView () {
    const { query } = this.props
    return <PublisherSuggestionContainer query={query} publisher={query} />
  }

  renderListView () {
    const { openPublisher, publishers } = this.props
    if (!publishers.length || this.state.suggestion) return this.renderSuggestionView()
    return (
      <PublisherSelectorList
        hasPublishers={this.hasPublishers}
        publishers={publishers}
        openPublisher={openPublisher}
      />
    )
  }
}

PublisherSelector.propTypes = {
  query: PropTypes.string.isRequired,
  publishers: PropTypes.array.isRequired,
  openPublisher: PropTypes.func.isRequired,
  emptyInput: PropTypes.func.isRequired,
  handleQuery: PropTypes.func.isRequired
}

export default PublisherSelector
