import React, { PropTypes } from 'react'
import { Image } from 'react-native'
import HeaderButton from '../HeaderButton'

const HeaderSwitchLinkButton = ({ onPress }) => {
  const content = <Image source={require('./assets/image.png')} />
  return <HeaderButton content={content} onPress={onPress} />
}

HeaderSwitchLinkButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default HeaderSwitchLinkButton
