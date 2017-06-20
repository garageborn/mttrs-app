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
  shouldComponentUpdate (nextProps) {
    return this.props.isComplete !== nextProps.isComplete
  }

  render () {
    const { intl } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Heading color='#999' size='regular'>
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
    const { intl, isComplete, onComplete } = this.props

    return (
      <Button
        background={'transparent'}
        inactive={!isComplete}
        content={intl.formatMessage(messages.button)}
        onPress={onComplete}
        size='small'
      />
    )
  }
}

AddFavoritesHeading.propTypes = {
  onComplete: PropTypes.func.isRequired,
  isComplete: PropTypes.bool.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  })
}

export default injectIntl(AddFavoritesHeading)
