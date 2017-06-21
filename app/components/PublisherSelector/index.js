import React, { PureComponent, PropTypes } from 'react'
import { View } from 'react-native'
import PublisherSearch from '../PublisherSearch'
import PublisherSelectorList from '../PublisherSelectorList'
import PublisherSuggestionTrigger from '../PublisherSuggestionTrigger'
import PublisherSuggestionContainer from '../../containers/PublisherSuggestionContainer'
import styles from './styles'

class PublisherSelector extends PureComponent {
  constructor () {
    super()
    this.handleSuggestionTrigger = this.handleSuggestionTrigger.bind(this)
    this.state = { suggestion: false }
  }

  render () {
    const { query, handleQuery } = this.props
    const { suggestion } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <PublisherSearch handleQuery={handleQuery} query={query} suggestion={suggestion} />
          <PublisherSuggestionTrigger onPress={this.handleSuggestionTrigger} active={suggestion} />
        </View>
        {this.renderContent()}
      </View>
    )
  }

  handleSuggestionTrigger () {
    return this.setState({ suggestion: !this.state.suggestion })
  }

  renderContent () {
    return this.state.suggestion ? this.renderSuggestionView() : this.renderListView()
  }

  renderSuggestionView () {
    const { query } = this.props
    return <PublisherSuggestionContainer query={query} />
  }

  renderListView () {
    const { openPublisher, publishers } = this.props
    return <PublisherSelectorList publishers={publishers} openPublisher={openPublisher} />
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
