import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import styles from './styles.js'

const messages = defineMessages({
  versions: { id: 'statsTitle.versions' },
  times: { id: 'times' }
})

const StatsTitle = ({ intl, linkCount, totalCount }) => {
  const times = intl.formatMessage(messages.times, {itemCount: totalCount})
  const versions = intl.formatMessage(messages.versions, {itemCount: linkCount})
  const total = intl.formatNumber(totalCount)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.textHighlight}>{linkCount} </Text>
        {versions}
        <Text style={styles.textHighlight}> {total} </Text>
        {times}
      </Text>
    </View>
  )
}

StatsTitle.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
    formatNumber: PropTypes.func.isRequired
  }).isRequired,
  linkCount: PropTypes.number,
  totalCount: PropTypes.number
}

export default injectIntl(StatsTitle)
