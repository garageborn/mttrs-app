import React, { Component, PropTypes } from 'react'
import { Text, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import styles from './styles'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'

const messages = defineMessages({
  addFavorite: { id: 'storyDialog.addFavorite' },
  removeFavorite: { id: 'storyDialog.removeFavorite' },
  share: { id: 'storyDialog.share' }
})

class StoryDialog extends Component {
  render () {
    return (
      <View style={styles.container}>
        {this.renderFavoriteAction()}
        {this.renderShareAction()}
      </View>
    )
  }

  renderFavoriteAction () {
    const { handleSharePress, intl, isFavorite } = this.props
    const addFavorite = intl.formatMessage(messages.addFavorite)
    const removeFavorite = intl.formatMessage(messages.removeFavorite)
    const label = isFavorite ? removeFavorite : addFavorite

    return (
      <Touchable onPress={handleSharePress} underlayColor={WHITE_TRANSPARENT_COLOR} >
        <View>
          <Text>{label}</Text>
          <Text style={styles.publisherName}>{this.publisherName}</Text>
        </View>
      </Touchable>
    )
  }

  renderShareAction () {
    const { handleSharePress, intl } = this.props
    const share = intl.formatMessage(messages.share)

    return (
      <Touchable onPress={handleSharePress} underlayColor={WHITE_TRANSPARENT_COLOR} >
        <Text>{share}</Text>
      </Touchable>
    )
  }

  get publisherName () {
    const { publisher } = this.props
    return publisher.display_name || publisher.name
  }
}

StoryDialog.propTypes = {
  publisher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    display_name: PropTypes.string
  }).isRequired,
  handleFavoritePress: PropTypes.func.isRequired,
  handleSharePress: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(StoryDialog)
