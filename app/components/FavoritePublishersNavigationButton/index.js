import React, { PropTypes } from 'react'
import { Image, View } from 'react-native'
import { injectIntl } from 'react-intl'
import LinearGradient from 'react-native-linear-gradient'
import styles from './styles'
const image = require('./assets/image.png')

const FavoritePublishersNavigationButton = ({ intl }) => (
  <View style={styles.container}>
    <LinearGradient
      style={styles.gradient}
      start={{x: 1, y: 0}} end={{x: 0, y: 0}}
      colors={['rgba(241, 241, 241, 1)', 'rgba(241, 241, 241, .5)', 'rgba(241, 241, 241, .1)']}
    />
    <Image source={image} />
  </View>
)

FavoritePublishersNavigationButton.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(FavoritePublishersNavigationButton)
