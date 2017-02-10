import React, { PropTypes } from 'react'
import { Text } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import Error from '../Error'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const messages = defineMessages({
  openInBrowser: {
    id: 'webview.openInBrowser'
  }
})

const WebViewError = ({ intl, onPressReload, onPressOpenInBrowser }) => {
  const openInBrowser = intl.formatMessage(messages.openInBrowser)

  return (
    <Error onPressReload={onPressReload}>
      <Touchable
        style={styles.buttonContainer}
        onPress={onPressOpenInBrowser}
        underlayColor={WHITE_TRANSPARENT_COLOR}
      >
        <Text style={styles.buttonText}>{openInBrowser}</Text>
      </Touchable>
    </Error>
  )
}

WebViewError.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }),
  onPressReload: PropTypes.func.isRequired,
  onPressOpenInBrowser: PropTypes.func.isRequired
}

export default injectIntl(WebViewError)
