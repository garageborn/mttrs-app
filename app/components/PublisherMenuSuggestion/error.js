import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Button from './button'
import styles from './styles'

const messages = defineMessages({
  error: {
    id: 'publisher.suggestion.error'
  },

  refreshButton: {
    id: 'publisher.suggestion.refreshButton'
  }
})

const Error = ({ intl }) => {
  let error = intl.formatMessage(messages.error)
  let label = intl.formatMessage(messages.refreshButton)

  return (
    <View style={styles.errorContainer}>
      <View style={styles.errorMessage}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
      <Button
        onPress={() => console.log(123)}
        label={label.toUpperCase()}
        skin={styles.refreshButton}
      />
    </View>
  )
}

Error.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(Error)
