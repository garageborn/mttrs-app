import React, { PropTypes } from 'react'
import { View, Text, Image } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import { COLORLESS } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const messages = defineMessages({
  settings: {
    id: 'menu.settings',
    defaultMessage: 'settings'
  }
})

const MenuSettingsLabel = ({ intl, tenant, onPress }) => {
  return (
    <View style={styles.settings}>
      <Touchable underlayColor={COLORLESS} onPress={onPress} style={styles.touch}>
        <View style={styles.touchContainer}>
          <Text style={styles.tenant}>{tenant}</Text>
          <Image style={styles.image} source={require('./assets/image.png')} />
          <Text style={styles.settingsTitle}>{intl.formatMessage(messages.settings)}</Text>
        </View>
      </Touchable>
    </View>
  )
}

MenuSettingsLabel.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  tenant: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

export default injectIntl(MenuSettingsLabel)
