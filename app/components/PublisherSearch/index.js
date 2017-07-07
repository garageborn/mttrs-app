import React, { PropTypes, Component } from 'react'
import { View, TextInput, Image, Platform, TouchableNativeFeedback } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import _isEmpty from 'lodash/isEmpty'
import icon from './assets/icon.png'
import close from './assets/close.png'
import styles, { textColor } from './styles'

const messages = defineMessages({
  searchPlaceholder: { id: 'search.placeholder' },
  suggestionPlaceholder: { id: 'publisher.suggestion.placeholder' }
})

class PublisherSearch extends Component {
  constructor () {
    super()
    this.clear = this.clear.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    return this.props.query !== nextProps.query || this.props.suggestion !== nextProps.suggestion
  }

  clear () {
    if (this.refs.textInput) {
      this.refs.textInput.clear()
      this.refs.textInput.blur()
    }
    this.props.closeSuggestion()
    this.props.handleQuery('')
  }

  clearButton () {
    if (Platform.OS === 'ios') return null
    if (_isEmpty(this.props.query)) return null

    return (
      <TouchableNativeFeedback onPress={this.clear}>
        <View style={styles.close}>
          <Image source={close} />
        </View>
      </TouchableNativeFeedback>
    )
  }

  render () {
    const { handleQuery } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <Image style={styles.icon} source={icon} />
          <TextInput
            ref='textInput'
            style={styles.searchInput}
            underlineColorAndroid={'transparent'}
            placeholder={this.placeholder}
            placeholderTextColor={textColor}
            onChangeText={handleQuery}
            clearButtonMode='while-editing'
          />
          {this.clearButton()}
        </View>
      </View>
    )
  }

  get placeholder () {
    const { intl, suggestion } = this.props
    if (!suggestion) return intl.formatMessage(messages.searchPlaceholder)
    return intl.formatMessage(messages.suggestionPlaceholder)
  }
}

PublisherSearch.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  query: PropTypes.string.isRequired,
  handleQuery: PropTypes.func.isRequired,
  suggestion: PropTypes.bool.isRequired
}

export default injectIntl(PublisherSearch)
