import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Heading from '../Heading'
import Button from '../Button'
import styles from './styles'

const messages = defineMessages({
  heading: { id: 'favoritePublishers.heading' },
  buttonActive: { id: 'favoritePublishers.button' }
})

class FavoritesPublishersHeading extends Component {
  render () {
    const { intl } = this.props

    return (
      <View style={styles.container}>
        <Heading color='#999' size='regular'>
          {intl.formatMessage(messages.heading)}
        </Heading>
        {this.renderButton()}
      </View>
    )
  }

  renderButton () {
    const { intl, handleComplete } = this.props
    return (
      <Button
        background='transparent'
        content={intl.formatMessage(messages.buttonActive)}
        onPress={handleComplete}
        size='small'
      />
    )
  }
}

FavoritesPublishersHeading.propTypes = {
  handleComplete: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(FavoritesPublishersHeading)
