import React, {PropTypes} from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { injectIntl, defineMessages } from 'react-intl'

const messages = defineMessages({
  todaysNews: {
    id: 'publisherListSeparator.todaysNews'
  }
})

const PublisherSelectorSectionHeader = ({ intl, section }) => {
  const todaysNews = intl.formatMessage(messages.todaysNews)

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.textLeftContainer}>
          <Text style={styles.textLeft}>{section}</Text>
        </View>
        <Text style={styles.textRight}>{todaysNews}</Text>
      </View>
    </View>
  )
}

PublisherSelectorSectionHeader.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  section: PropTypes.string.isRequired
}

export default injectIntl(PublisherSelectorSectionHeader)
