import React, { Component, PropTypes } from 'react'
import { Platform, Text, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'

const messages = defineMessages({
  description: { id: 'rateApp.description' },
  label: {
    id: Platform.select({
      ios: 'rateApp.label.ios',
      android: 'rateApp.label.android'
    })
  }
})

class RateAppSettings extends Component {
  render () {
    const { intl, onPress } = this.props
    const label = intl.formatMessage(messages.label)
    const description = intl.formatMessage(messages.description)

    return (
      <Touchable onPress={onPress} underlayColor={WHITE_TRANSPARENT_COLOR}>
        <View>
          <Text>{label}</Text>
          <Text>{description}</Text>
        </View>
      </Touchable>
    )
  }
}

RateAppSettings.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default injectIntl(RateAppSettings)
