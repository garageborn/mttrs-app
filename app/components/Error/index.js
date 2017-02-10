import React, { PropTypes } from 'react'
import { View, Image, Text } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import iconLight from './assets/icon-light.png'
import iconDark from './assets/icon-dark.png'
import bgLight from './assets/bg-light.png'
import bgDark from './assets/bg-dark.png'
import styles from './styles'

const messages = defineMessages({
  text: {
    id: 'error.text'
  },
  buttonText: {
    id: 'error.buttonText'
  }
})

const Error = ({ intl, skinType, onPressReload, children }) => {
  const text = intl.formatMessage(messages.text)
  const buttonText = intl.formatMessage(messages.buttonText)

  let skin = {
    bg: skinType === 'dark' ? bgDark : bgLight,
    icon: skinType === 'dark' ? iconDark : iconLight,
    textColor: skinType === 'dark' ? '#F1F1F1' : '#999999'
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.bg}
        source={skin.bg}
      />
      <View style={styles.textContainer}>
        <Image
          style={styles.icon}
          source={skin.icon}
        />
        <Text style={[{color: skin.textColor}, styles.text]}>{text}</Text>
        <Touchable
          underlayColor={WHITE_TRANSPARENT_COLOR}
          style={styles.buttonContainer}
          onPress={onPressReload}
        >
          <View>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </View>
        </Touchable>
        {children}
      </View>
    </View>
  )
}

Error.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  onPressReload: PropTypes.func.isRequired,
  children: PropTypes.node,
  skinType: PropTypes.string
}

export default injectIntl(Error)
