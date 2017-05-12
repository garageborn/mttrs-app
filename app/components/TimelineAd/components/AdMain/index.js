import React, { PropTypes } from 'react'
import { View, Text, Image } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import styles from './styles.js'

const messages = defineMessages({
  sponsored: { id: 'sponsored' }
})

const AdMain = ({ icon, intl, subtitle, title }) => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{uri: icon}} />
    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{intl.formatMessage(messages.sponsored)}</Text>
    </View>
  </View>
)

AdMain.propTypes = {
  icon: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(AdMain)
