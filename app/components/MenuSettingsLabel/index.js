import React, { PropTypes } from 'react'
import { View, Text, Image } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import { COLORLESS } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const messages = defineMessages({
  settings: { id: 'menu.settings' },
  mttrs_us: { id: 'mttrs_us.label' },
  mttrs_br: { id: 'mttrs_br.label' }
})

const MenuSettingsLabel = ({ intl, tenant, onPress }) => {
  const { formatMessage } = intl
  const tenantLabel = formatMessage(messages[tenant.id])

  return (
    <View style={styles.settings}>
      <Touchable underlayColor={COLORLESS} onPress={onPress} style={styles.touch}>
        <View style={styles.touchContainer}>
          <Text style={styles.tenant}>{tenantLabel}</Text>
          <Image style={styles.image} source={require('./assets/image.png')} />
          <Text style={styles.settingsTitle}>{formatMessage(messages.settings)}</Text>
        </View>
      </Touchable>
    </View>
  )
}

MenuSettingsLabel.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  tenant: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  onPress: PropTypes.func.isRequired
}

export default injectIntl(MenuSettingsLabel)
