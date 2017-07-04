import React from 'react'
import { Text, View } from 'react-native'
import { injectIntl } from 'react-intl'
import styles from './styles'

const TenantIconsDisclaimer = ({ intl }) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {intl.formatMessage({ id: 'tenantList.disclaimer' })}
    </Text>
  </View>
)

export default injectIntl(TenantIconsDisclaimer)
