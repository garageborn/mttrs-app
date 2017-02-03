import React, { PropTypes } from 'react'
import { View, Image, Text } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import styles from './styles'

const messages = defineMessages({
  textPrimary: {
    id: 'disconnected.textPrimary',
    defaultMessage: 'No internet connection'
  },
  textSecondary: {
    id: 'disconnected.textSecondary',
    defaultMessage: 'Try again when you are online'
  },
  buttonText: {
    id: 'disconnected.buttonText',
    defaultMessage: 'Reload'
  }
})

const TimelineError = ({ intl, reloadTimeline }) => {
  const textPrimary = intl.formatMessage(messages.textPrimary)
  const textSecondary = intl.formatMessage(messages.textSecondary)
  const buttonText = intl.formatMessage(messages.buttonText)
  return (
    <View style={styles.container}>
      <Image style={styles.bg} source={require('../../assets/disconnected-bg.png')} />
      <View>
        <Image style={styles.icon} source={require('../../assets/icons/disconnected.png')} />
        <Text style={styles.textPrimary}>{textPrimary}</Text>
        <Text style={styles.textSecondary}>{textSecondary}</Text>
        <Touchable onPress={reloadTimeline}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </View>
        </Touchable>
      </View>
    </View>
  )
}

TimelineError.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  reloadTimeline: PropTypes.func.isRequired
}

export default injectIntl(TimelineError)
