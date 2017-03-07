import React, { PropTypes, Component } from 'react'
import { View, TextInput, Image, Platform, TouchableNativeFeedback } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import icon from './assets/icon.png'
import close from './assets/close.png'
import styles, { textColor } from './styles'

const messages = defineMessages({
  searchPlaceholder: {
    id: 'search.placeholder'
  }
})

class PublisherSearch extends Component {
  constructor () {
    super()

    this.clear = this.clear.bind(this)
  }

  clear () {
    this.refs.textInput.clear()
    this.props.onClearSearch()
  }

  clearButton () {
    if (Platform.OS === 'ios' || this.props.emptyInput) return
    return (
      <TouchableNativeFeedback onPress={this.clear}>
        <View style={styles.close}>
          <Image source={close} />
        </View>
      </TouchableNativeFeedback>
    )
  }

  render () {
    const { intl, onChangeText } = this.props
    let placeholder = intl.formatMessage(messages.searchPlaceholder)
    return (
      <View style={styles.container}>
        <View style={styles.search} shadowOffset={{width: 1, height: 2}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1.0}>
          <Image style={styles.icon} source={icon} />
          <TextInput
            ref='textInput'
            style={styles.searchInput}
            underlineColorAndroid={'transparent'}
            placeholder={placeholder}
            placeholderTextColor={textColor}
            onChangeText={onChangeText}
            clearButtonMode='while-editing'
          />
          {this.clearButton()}
        </View>
      </View>
    )
  }
}

PublisherSearch.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  emptyInput: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired
}

export default injectIntl(PublisherSearch)
