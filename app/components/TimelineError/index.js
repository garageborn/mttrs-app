import React, { PropTypes } from 'react'
import { View, Image, Text, Button } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
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
      <Text>There's apparently a problem with your connection, please reload</Text>
      <Button title='Reload' onPress={reloadTimeline} />
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
