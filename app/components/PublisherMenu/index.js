import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import PublisherSearch from '../PublisherSearch'
import PublisherMenuListView from '../PublisherMenuListView'
import PublisherMenuSuggestionContainer from '../../containers/PublisherMenuSuggestionContainer'
import styles from './styles'

class PublisherMenu extends Component {
  renderView () {
    const { publishers } = this.props
    if (!publishers.length) return this.renderSuggestionView()
    return (
      <PublisherMenuListView
        hasPublishers={this.hasPublishers}
        publishers={publishers}
        openPublisher={this.props.openPublisher}
      />
    )
  }

  renderSuggestionView () {
    return <PublisherMenuSuggestionContainer publisher={this.props.query} />
  }

  render () {
    return (
      <View style={styles.container}>
        <PublisherSearch
          onChangeText={this.props.onChangeText}
          onClearSearch={this.props.onClearSearch}
          emptyInput={this.props.emptyInput}
        />
        {this.renderView()}
      </View>
    )
  }
}

PublisherMenu.propTypes = {
  query: PropTypes.string.isRequired,
  publishers: PropTypes.array.isRequired,
  openPublisher: PropTypes.func.isRequired,
  emptyInput: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired
}

export default PublisherMenu
