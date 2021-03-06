import React, { PropTypes } from 'react'
import { View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Button from '../Button'
import styles from './styles'

const messages = defineMessages({
  button: { id: 'addFavorites.button' }
})

const AddFavoritesFooter = ({ intl, isComplete, onPress }) => (
  <View style={styles.container}>
    <Button
      background='danger'
      content={intl.formatMessage(messages.button)}
      inactive={!isComplete}
      onPress={onPress}
      size='regular'
    />
  </View>
)

AddFavoritesFooter.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  isComplete: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
}

export default injectIntl(AddFavoritesFooter)
