import React, { PropTypes } from 'react'
import { View, Text, Image } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import { COLORLESS } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const messages = defineMessages({
  settings: {
    id: 'menu.settings',
    defaultMessage: 'Settings'
  }
})

const MenuSettingsLabel = ({ intl, namespace, onPress }) => {
  return (
    <View style={styles.settings}>
      <Text style={styles.namespace}>{namespace}</Text>
      <Touchable underlayColor={COLORLESS} onPress={onPress} style={styles.touch}>
        <View style={styles.touchContainer}>
          <Image source={require('../../assets/icons/icon-settings.png')} />
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
  namespace: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

export default injectIntl(MenuSettingsLabel)
