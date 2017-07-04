import React, { PropTypes } from 'react'
import { Platform, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import SettingsItem from '../SettingsItem'
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

const RateAppSettings = ({ intl, onPress }) => {
  const label = intl.formatMessage(messages.label)
  const description = intl.formatMessage(messages.description)

  return (
    <Touchable onPress={onPress} underlayColor={WHITE_TRANSPARENT_COLOR}>
      <View>
        <SettingsItem title={label} subtitle={description} />
      </View>
    </Touchable>
  )
}

RateAppSettings.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  onPress: PropTypes.func.isRequired
}

export default injectIntl(RateAppSettings)
