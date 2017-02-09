import React, { PropTypes } from 'react'
import { View, Image, Text } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import styles from './styles'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'

const messages = defineMessages({
  text: {
    id: 'disconnected.textPrimary'
  },
  buttonText: {
    id: 'disconnected.buttonText'
  }
})

const ErrorDisclaimer = ({ from, intl, data }) => {
  const textPrimary = intl.formatMessage(messages.textPrimary)
  const buttonText = intl.formatMessage(messages.buttonText)

  let types = {
    timeline: {
      color: 'grey',
      backgroundSource: require('./assets/bg-light.png')
    },
    menu: {
      color: 'grey',
      backgroundSource: require('./assets/bg-dark.png')
    }
  }

  let refetchData = () => {
    return data.refetch({
      notifyOnNetworkStatusChange: true
    })
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.bg}
        source={types[from].backgroundSource}
      />
      <View style={styles.textContainer}>
        {/* <Image
          style={styles.icon}
          source={require('../../assets/icons/disconnected.png')}
        /> */}
        <Text style={styles.textPrimary}>{textPrimary}</Text>
        <Touchable
          underlayColor={WHITE_TRANSPARENT_COLOR}
          style={styles.buttonContainer}
          onPress={refetchData}
        >
          <View>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </View>
        </Touchable>
      </View>
    </View>
  )
}

ErrorDisclaimer.propTypes = {
  from: PropTypes.string,
  data: PropTypes.object,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(ErrorDisclaimer)
