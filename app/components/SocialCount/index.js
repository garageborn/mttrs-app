import React, { PropTypes } from 'react'
import { Image, Text, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import styles from './styles'
import SocialCountFormatter from '../../common/utils/SocialCountFormatter'

const messages = defineMessages({
  shares: { id: 'shares' }
})

const SocialCount = ({ totalSocial, intl }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={require('../../assets/icons/icon-hot.png')} />
      <Text style={styles.text}>{SocialCountFormatter(totalSocial)} </Text>
      <Text style={styles.text}>{intl.formatMessage(messages.shares)}</Text>
    </View>
  )
}

SocialCount.propTypes = {
  totalSocial: PropTypes.number.isRequired
}

export default injectIntl(SocialCount)
