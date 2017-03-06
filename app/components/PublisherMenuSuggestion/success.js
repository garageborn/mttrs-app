import React, { PropTypes } from 'react'
import { Text } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import styles from './styles'

const messages = defineMessages({
  success: {
    id: 'publisher.suggestion.success'
  }
})

const Success = ({ intl }) => {
  let success = intl.formatMessage(messages.success)

  return <Text style={styles.success}>{success}</Text>
}

Success.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(Success)
