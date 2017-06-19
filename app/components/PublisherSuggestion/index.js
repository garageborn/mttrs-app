import React, { Component, PropTypes } from 'react'
import { View, Text, Image } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Success from './components/Success'
import Error from './components/Error'
import Button from '../Button'
import icon from './assets/icon.png'
import styles from './styles'
import _noop from 'lodash/noop'
import _isEmpty from 'lodash/isEmpty'

const messages = defineMessages({
  title: { id: 'publisher.suggestion.title' },
  subTitle: { id: 'publisher.suggestion.subTitle' },
  sendButton: { id: 'publisher.suggestion.sendButton' }
})

class PublisherSuggestion extends Component {
  constructor () {
    super()
    this.onButtonPress = this.onButtonPress.bind(this)
  }

  renderStatus () {
    if (this.props.status === 'success') return <Success />
    if (this.props.status === 'error') return <Error />
    return <View style={styles.buttonContainer}>{this.renderButton()}</View>
  }

  render () {
    const { intl, query } = this.props
    let title = intl.formatMessage(messages.title)
    let subTitle = intl.formatMessage(messages.subTitle)

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <Image style={styles.icon} source={icon} />
        <Text style={styles.publisher}>{query}</Text>
        {this.renderStatus()}
      </View>
    )
  }

  renderButton () {
    const { intl, query } = this.props
    let label = intl.formatMessage(messages.sendButton).toUpperCase()

    let options = {}
    if (_isEmpty(query)) {
      options = { inactive: true, onPress: _noop }
    } else {
      options = { onPress: this.onButtonPress }
    }
    return <Button background='danger' content={label} size='regular' {...options} />
  }

  onButtonPress () {
    if (this.props.query === '') return null
    return this.props.sendSuggestion()
  }
}

PublisherSuggestion.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  sendSuggestion: PropTypes.func,
  status: PropTypes.string.isRequired
}

export default injectIntl(PublisherSuggestion)
