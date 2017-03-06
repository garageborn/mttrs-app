import React, { Component, PropTypes } from 'react'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Success from './success'
import Error from './error'
import Button from './button'
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
    return <Error />
  }

  success () {
    return <Success />
  }

  activityIndicator () {
    return <ActivityIndicator style={styles.loading} size='small' />
  }

  actions () {
    if (this.state.success) return this.success()

    const { intl } = this.props
    let label = intl.formatMessage(messages.sendButton)

    return (
      <Button
        onPress={() => this.setState({success: true})}
        label={label.toUpperCase()}
        skin={styles.sendButton}
      />
    )
  }

  render () {
    const { intl, publisher } = this.props
    let title = intl.formatMessage(messages.title)
    let subTitle = intl.formatMessage(messages.subTitle)

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <Image style={styles.icon} source={icon} />
        <Text style={styles.publisher}>{publisher}</Text>
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
