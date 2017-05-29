import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Heading from '../Heading'
import Button from '../Button'
import styles from './styles'

const messages = defineMessages({
  heading: { id: 'addFavorites.heading' },
  button: { id: 'addFavorites.button' }
})

class AddFavoritesHeading extends Component {
  render () {
    const { intl } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Heading size='regular'>
            {intl.formatMessage(messages.heading)}
          </Heading>
        </View>
        <View style={styles.buttonContainer}>
          {this.renderButton()}
        </View>
      </View>
    )
  }

  renderButton () {
    const { intl, isComplete, openFavoritesTimeline } = this.props

    return (
      <Button
        background={'transparent'}
        inactive={!isComplete}
        content={intl.formatMessage(messages.button)}
        onPress={openFavoritesTimeline}
        size='small'
      />
    )
  }
}

AddFavoritesHeading.propTypes = {
  openFavoritesTimeline: PropTypes.func.isRequired,
  isComplete: PropTypes.bool.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  })
}

export default injectIntl(AddFavoritesHeading)
