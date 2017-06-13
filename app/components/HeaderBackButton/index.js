import React, { PropTypes } from 'react'
import { Image } from 'react-native'
import HeaderButton from '../HeaderButton'

const HeaderBackButton = ({ onPress }) => {
  const content = <Image source={require('./assets/image.png')} />
  return <HeaderButton onPress={onPress} content={content} />
}

HeaderBackButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default HeaderBackButton
