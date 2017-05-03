import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import ShareButtonContainer from '../../../../containers/ShareButtonContainer'
import styles from './styles.js'

const messages = defineMessages({
  share: { id: 'share' }
})

const StatsButtonWrapper = ({ intl, link, story }) => {
  const { formatMessage } = intl
  const text = formatMessage(messages.share)

  return (
    <View style={styles.container}>
      <ShareButtonContainer link={link} story={story}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </ShareButtonContainer>
    </View>
  )
}

StatsButtonWrapper.propTypes = {
  link: PropTypes.object.isRequired,
  story: PropTypes.object.isRequired
}

export default injectIntl(StatsButtonWrapper)
