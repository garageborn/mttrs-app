import React, { PropTypes } from 'react'
import { Image, View } from 'react-native'
import { injectIntl } from 'react-intl'
import Touchable from '../Touchable/'
import DialogButton from '../DialogButton/'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import image from './assets/image.png'

const CopyLinkButton = ({ intl, onPress }) => (
  <Touchable onPress={onPress} underlayColor={WHITE_TRANSPARENT_COLOR}>
    <View>
      <DialogButton
        icon={<Image source={image} />}
        messages={[intl.formatMessage({ id: 'storyDialog.copyLink' })]}
      />
    </View>
  </Touchable>
)

CopyLinkButton.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(CopyLinkButton)
