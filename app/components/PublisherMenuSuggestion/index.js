import React, { Component, PropTypes } from 'react'
import { View, Text, Image } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
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
  constructor () {
    super()

    this.state = {
      success: false
    }

    this.actions = this.actions.bind(this)
  }

  error () {
    const { intl } = this.props
    let error = intl.formatMessage(messages.error)
    return <Text style={styles.error}>{error}</Text>
  }

  success () {
    const { intl } = this.props
    let success = intl.formatMessage(messages.success)
    return <Text style={styles.success}>{success}</Text>
  }

  actions () {
    if (this.state.success) return this.success()

    const { intl } = this.props
    let label = intl.formatMessage(messages.sendButton)

    return (
      <Touchable onPress={() => this.setState({success: true})} underlayColor={WHITE_TRANSPARENT_COLOR}>
        <View style={styles.sendButton}>
          <Text style={styles.label}>{label.toUpperCase()}</Text>
        </View>
      </Touchable>
    )
  }

  render () {
    const { intl } = this.props
    let title = intl.formatMessage(messages.title)
    let subTitle = intl.formatMessage(messages.subTitle)

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <Image style={styles.icon} source={icon} />
        <Text style={styles.publisher}>Nome do Site</Text>
        {this.actions()}
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
