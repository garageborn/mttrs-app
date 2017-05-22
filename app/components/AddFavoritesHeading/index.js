import React, { PropTypes, Component } from 'react'
import { Text, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import styles from './styles'

const messages = defineMessages({
  heading: { id: 'addFavorites.heading' },
  button: { id: 'addFavorites.button' }
})

class AddFavoritesHeading extends Component {
  render () {
    const { intl } = this.props

    return (
      <View>
        <Text>{intl.formatMessage(messages.heading)}</Text>
        {this.renderButton()}
      </View>
    )
  }

  renderButton () {
    const { intl, isComplete, openFavorites } = this.props
    const style = isComplete ? styles.activeButton : styles.button

    return (
      <Touchable onPress={openFavorites}>
        <Text style={style}>{intl.formatMessage(messages.button)}</Text>
      </Touchable>
    )
  }
}

AddFavoritesHeading.propTypes = {
  openFavorites: PropTypes.func.isRequired,
  isComplete: PropTypes.bool.isRequired
}

export default injectIntl(AddFavoritesHeading)
