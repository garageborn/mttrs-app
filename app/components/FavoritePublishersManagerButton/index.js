import React, { PropTypes } from 'react'
import { View } from 'react-native'
import { injectIntl } from 'react-intl'
import Button from '../Button'
import styles from './styles'

const FavoritePublishersManagerButton = ({ intl, onPress }) => (
  <View style={styles.container}>
    <Button
      background='transparent'
      content={intl.formatMessage({id: 'favoritePublishersManagerButton'})}
      onPress={onPress}
      size='regular'
    />
  </View>
)

FavoritePublishersManagerButton.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  onPress: PropTypes.func.isRequired
}

export default injectIntl(FavoritePublishersManagerButton)
