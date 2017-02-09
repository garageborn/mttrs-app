import React, { PropTypes } from 'react'
import { View, Image, Text } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const messages = defineMessages({
  text: {
    id: 'disconnected.text'
  },
  buttonText: {
    id: 'disconnected.buttonText'
  }
})

const ErrorDisclaimer = ({ from, intl, data }) => {
  const text = intl.formatMessage(messages.text)
  const buttonText = intl.formatMessage(messages.buttonText)

  let types = {
    timeline: {
      textColor: '#999999',
      iconSource: require('./assets/icon-light.png'),
      backgroundSource: require('./assets/bg-light.png')
    },
    menu: {
      textColor: '#F1F1F1',
      iconSource: require('./assets/icon-dark.png'),
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
        <Image
          style={styles.icon}
          source={types[from].iconSource}
        />
        <Text style={[{color: types[from].textColor}, styles.text]}>{text}</Text>
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
  from: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(ErrorDisclaimer)
