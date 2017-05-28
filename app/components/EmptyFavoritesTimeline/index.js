import React, { Component, PropTypes } from 'react'
import { Text, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Button from '../Button'

const messages = defineMessages({
  button: { id: 'emptyFavoritesTimeline.button' },
  heading: { id: 'emptyFavoritesTimeline.heading' }
})

class EmptyFavoritesTimeline extends Component {
  render () {
    const { intl, onPress } = this.props

    return (
      <View>
        <Text>{intl.formatMessage(messages.heading)}</Text>
        <Button
          background='danger'
          content={intl.formatMessage(messages.button)}
          onPress={onPress}
          size='regular'
        />
      </View>
    )
  }
}

EmptyFavoritesTimeline.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  onPress: PropTypes.func.isRequired
}

export default injectIntl(EmptyFavoritesTimeline)
