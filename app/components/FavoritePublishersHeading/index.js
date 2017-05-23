import React, { PropTypes, Component } from 'react'
import { Text, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import styles from './styles'

const messages = defineMessages({
  heading: { id: 'favoritePublishers.heading' },
  button: { id: 'favoritePublishers.button' }
})

class FavoritesPublishersHeading extends Component {
  render () {
    const { handleComplete, intl } = this.props

    return (
      <View>
        <Text>{intl.formatMessage(messages.heading)}</Text>
        <Touchable onPress={handleComplete}>
          <Text style={styles.button}>{intl.formatMessage(messages.button)}</Text>
        </Touchable>
      </View>
    )
  }
}

FavoritesPublishersHeading.propTypes = {
  handleComplete: PropTypes.func.isRequired
}

export default injectIntl(FavoritesPublishersHeading)
