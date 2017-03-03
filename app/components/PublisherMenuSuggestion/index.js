import React, { Component, PropTypes } from 'react'
import { View, Text, Image } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import icon from './assets/icon.png'
import styles from './styles'

const messages = defineMessages({
  title: {
    id: 'publisher.suggestion.title'
  },

  subTitle: {
    id: 'publisher.suggestion.subTitle'
  },

  sendButton: {
    id: 'publisher.suggestion.sendButton'
  },

  success: {
    id: 'publisher.suggestion.success'
  },

  error: {
    id: 'publisher.suggestion.error'
  },

  refreshButton: {
    id: 'publisher.suggestion.refreshButton'
  }
})

class PublisherMenuSuggestion extends Component {
  render () {
    const { intl } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{intl.formatMessage(messages.title)}</Text>
        <Text style={styles.subTitle}>{intl.formatMessage(messages.subTitle)}</Text>
        <Image style={styles.icon} source={icon} />
        <Text style={styles.publisher}>Nome do Site</Text>
        <Touchable onPress={this.props.sendSuggestion}>
          <View style={styles.sendButton}>
            <Text style={styles.label}>{intl.formatMessage(messages.sendButton)}</Text>
          </View>
        </Touchable>
      </View>
    )
  }
}

PublisherMenuSuggestion.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  sendSuggestion: PropTypes.func.isRequired,
  publisher: PropTypes.string
}

export default injectIntl(PublisherMenuSuggestion)
