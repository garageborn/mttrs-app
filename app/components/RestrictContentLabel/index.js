import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import styles from './styles'

const messages = defineMessages({
  restrictContent: { id: 'restrict.content' }
})

const RestrictContentLabel = ({ intl }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{intl.formatMessage(messages.restrictContent)}</Text>
  </View>
)

RestrictContentLabel.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(RestrictContentLabel)
