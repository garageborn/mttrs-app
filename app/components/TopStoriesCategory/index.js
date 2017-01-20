import React, { PropTypes } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import { DARK_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const messages = defineMessages({
  topStories: {
    id: 'header.topStories',
    defaultMessage: 'Top Stories'
  }
})

const TopStoriesCategory = ({ intl, openHome }) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight underlayColor={DARK_TRANSPARENT_COLOR} onPress={openHome}>
        <View style={[styles.topStories, {borderBottomColor: '#FF5607'}]} shadowOffset={{width: 0, height: 2}} shadowColor={'rgba(0, 0, 0, 1)'} shadowOpacity={0.5} elevation={1}>
          <Text style={styles.title}>{intl.formatMessage(messages.topStories)}</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

TopStoriesCategory.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  openHome: PropTypes.func.isRequired
}

export default injectIntl(TopStoriesCategory)
