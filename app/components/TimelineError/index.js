import React, { PropTypes } from 'react'
import { View, Image, Text, Button } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import styles from './styles'

const messages = defineMessages({
  topStories: {
    id: 'header.topStories',
    defaultMessage: 'Top Stories'
  }
})

const TimelineError = ({ reloadTimeline }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.bg} source={require('../../assets/disconnected-bg.png')} />
      <View>
        <Image style={styles.icon} source={require('../../assets/icons/disconnected.png')}/>
        <Text style={styles.textPrimary}>No Internet connection</Text>
        <Text style={styles.textSecondary}>Try again when you are online</Text>
        <Touchable onPress={reloadTimeline}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Reload</Text>
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
