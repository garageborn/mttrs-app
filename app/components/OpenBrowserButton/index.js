import React, { Component, PropTypes } from 'react'
import { Image, Linking, View } from 'react-native'
import { injectIntl } from 'react-intl'
import Touchable from '../Touchable/'
import DialogButton from '../DialogButton/'
import captureError from '../../common/utils/captureError'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import image from './assets/image.png'

class OpenBrowserButton extends Component {
  constructor () {
    super()
    this.onPress = this.onPress.bind(this)
  }

  onPress () {
    const { link } = this.props
    const url = link.amp_url || link.url
    Linking.openURL(url).catch(err => captureError(err))
  }

  render () {
    const { intl } = this.props
    return (
      <Touchable onPress={this.onPress} underlayColor={WHITE_TRANSPARENT_COLOR}>
        <View>
          <DialogButton
            icon={<Image source={image} />}
            messages={[intl.formatMessage({id: 'storyDialog.openBrowser'})]}
          />
        </View>
      </Touchable>
    )
  }
}

OpenBrowserButton.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  link: PropTypes.shape({
    amp_url: PropTypes.string,
    url: PropTypes.string.isRequired
  }).isRequired
}

export default injectIntl(OpenBrowserButton)
