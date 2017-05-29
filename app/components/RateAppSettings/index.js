import React, { Component, PropTypes } from 'react'
import { Platform, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import Heading from '../Heading'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles, { regularTextColor, smallTextColor } from './styles'

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
        <View style={styles.container}>
          <Heading size='regular' color={regularTextColor}>{label}</Heading>
          <Heading size='small' color={smallTextColor}>{description}</Heading>
        </View>
      </Touchable>
    )
  }
}

RateAppSettings.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default injectIntl(RateAppSettings)
