import React, { PropTypes } from 'react'
import { View, Image, Text } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Button from '../Button'
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

const Error = ({ intl, skinType, onPressReload }) => {
  const text = intl.formatMessage(messages.text)
  const buttonText = intl.formatMessage(messages.buttonText)

  const skin = {
    dark: { bg: bgDark, icon: iconDark, textColor: styles.textInDark },
    light: { bg: bgLight, icon: iconLight, textColor: styles.textInLight }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.bg}
        source={skin[skinType].bg}
      />
      <View style={styles.textContainer}>
        <Image
          style={styles.icon}
          source={skin[skinType].icon}
        />
        <Text style={[skin[skinType].textColor, styles.text]}>{text}</Text>
        <Button skin={styles.buttonContainer} onPress={onPressReload}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Button>
      </View>
    </View>
  )
}

Error.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  onPressReload: PropTypes.func.isRequired,
  skinType: PropTypes.string
}

Error.defaultProps = {
  skinType: 'light'
}

export default injectIntl(Error)
