import React, { Component, PropTypes } from 'react'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Success from './components/Success'
import Error from './components/Error'
import Button from '../Button'
import icon from './assets/icon.png'
import buttonStyles from '../Button/styles.js'
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

    this.onButtonPress = this.onButtonPress.bind(this)
  }

  activityIndicator () {
    return <ActivityIndicator style={styles.loading} size='small' />
  }

  renderStatus () {
    if (this.props.status === 'success') return <Success />
    if (this.props.status === 'error') return <Error />
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
        {this.renderButton()}
        {this.renderStatus()}

      </View>
    )
  }

  renderButton () {
    const { intl } = this.props
    let label = intl.formatMessage(messages.sendButton)

    if (this.props.query === '') return this.renderInactiveButton(label)

    return (
      <Button onPress={this.onButtonPress} skin={styles.button}>
        <Text style={styles.buttonText}>{label.toUpperCase()}</Text>
      </Button>
    )
  }

  renderInactiveButton (label) {
    return (
      <View onPress={this.onButtonPress} style={[buttonStyles.button, styles.inactiveButton]}>
        <Text style={styles.inactiveButtonText}>{label.toUpperCase()}</Text>
      </View>
    )
  }

  onButtonPress () {
    if (this.props.query === '') return null
    return this.props.sendSuggestion()
  }

}

PublisherMenuSuggestion.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  sendSuggestion: PropTypes.func,
  publisher: PropTypes.string,
  status: PropTypes.string.isRequired
}

export default injectIntl(PublisherMenuSuggestion)
