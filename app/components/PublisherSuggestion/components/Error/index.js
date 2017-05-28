import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Button from '../../../Button'
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
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{error}</Text>
      </View>
      <Button background='danger' content={label.toUpperCase()} size='regular' />
    </View>
  )
}

Error.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(Error)
