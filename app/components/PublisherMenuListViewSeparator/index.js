import React, {PropTypes} from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { injectIntl, defineMessages } from 'react-intl'

const messages = defineMessages({
  recentStories: {
    id: 'publisherListSeparator.recentStories'
  }
})

const PublisherMenuListViewSeparator = ({ intl, section }) => {
  const recentStories = intl.formatMessage(messages.recentStories)

  return (
    <View
      shadowOffset={{width: 1, height: 2}}
      shadowColor={'rgba(0, 0, 0, .1)'}
      shadowOpacity={1}
    >
      <View style={styles.container}>
        <Text style={styles.textLeft}>{section}</Text>
        <Text style={styles.textRight}>{recentStories}</Text>
      </View>
    </View>
  )
}

PublisherMenuListViewSeparator.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  section: PropTypes.string.isRequired
}

export default injectIntl(PublisherMenuListViewSeparator)
