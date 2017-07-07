import React, { PureComponent, PropTypes } from 'react'
import { ScrollView, View } from 'react-native'
import PublisherSearch from '../PublisherSearch'
import PublisherSelectorList from '../PublisherSelectorList'
import PublisherSuggestionTrigger from '../PublisherSuggestionTrigger'
import PublisherSuggestionContainer from '../../containers/PublisherSuggestionContainer'
import styles from './styles'

class PublisherSelector extends PureComponent {
  constructor () {
    super()
    this.handleSuggestion = this.handleSuggestion.bind(this)
    this.state = { suggestion: false }
  }

  render () {
    const { query, handleQuery } = this.props
    const { suggestion } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <PublisherSearch handleQuery={handleQuery} query={query} suggestion={suggestion} closeSuggestion={() => this.handleSuggestion(true)} />
          <PublisherSuggestionTrigger onPress={() => this.handleSuggestion(suggestion)} active={suggestion} />
        </View>
        {this.renderContent()}
      </View>
    )
  }

  handleSuggestion (suggestion) {
    return this.setState({ suggestion: !suggestion })
  }

  renderContent () {
    return this.state.suggestion ? this.renderSuggestionView() : this.renderListView()
  }

  renderSuggestionView () {
    const { query } = this.props
    if (!query.length) return null
    return <PublisherSuggestionContainer query={query} />
  }

  renderListView () {
    const { openPublisher, publishers, query } = this.props
    return (
      <ScrollView>
        <PublisherSelectorList query={query} publishers={publishers} openPublisher={openPublisher} />
        {this.renderSuggestionView()}
      </ScrollView>
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
