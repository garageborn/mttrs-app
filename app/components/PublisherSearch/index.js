import React, { PropTypes } from 'react'
import { View, TextInput, Image } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import icon from './assets/icon.png'
import styles, { textColor } from './styles'

const messages = defineMessages({
  searchPlaceholder: {
    id: 'search.placeholder'
  }
})

const PublisherSearch = ({ intl, onChangeText }) => {
  let placeholder = intl.formatMessage(messages.searchPlaceholder)

  return (
    <View style={styles.container} elevation={4}>
      <View style={styles.search} shadowOffset={{width: 1, height: 2}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1.0} elevation={0}>
        <Image style={styles.icon} source={icon} />
        <TextInput
          style={styles.searchInput}
          underlineColorAndroid={'transparent'}
          placeholder={placeholder}
          placeholderTextColor={textColor}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  )
}

PublisherSearch.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  onChangeText: PropTypes.func.isRequired
}

export default injectIntl(PublisherSearch)
