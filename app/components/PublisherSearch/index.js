import React, { PropTypes, Component } from 'react'
import { View, TextInput, Image, Platform, TouchableNativeFeedback } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import icon from './assets/icon.png'
import close from './assets/close.png'
import styles, { textColor } from './styles'

const messages = defineMessages({
  searchPlaceholder: {
    id: 'search.placeholder'
  },
  suggestionPlaceholder: {
    id: 'publisher.suggestion.placeholder'
  }
})

class PublisherSearch extends Component {
  constructor () {
    super()

    this.clear = this.clear.bind(this)
  }

  clear () {
    this.refs.textInput.clear()
    this.refs.textInput.blur()
    this.props.handleQuery('')
  }

  clearButton () {
    if (Platform.OS === 'ios' || this.props.emptyInput()) return
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
        <View style={styles.search} shadowOffset={{width: 1, height: 2}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1.0}>
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
  emptyInput: PropTypes.func.isRequired,
  handleQuery: PropTypes.func.isRequired,
  suggestion: PropTypes.bool.isRequired
}

export default injectIntl(PublisherSearch)
