import React, { Component, PropTypes } from 'react'
import { Text, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'

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
        <Touchable onPress={onPress} underlayColor={WHITE_TRANSPARENT_COLOR} >
          <Text>{intl.formatMessage(messages.button)}</Text>
        </Touchable>
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
