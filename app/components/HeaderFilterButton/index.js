import React, { PropTypes } from 'react'
import { Image } from 'react-native'
import HeaderButton from '../HeaderButton'

const HeaderFilterButton = ({ onPress }) => {
  const content = <Image source={require('./assets/image.png')} />
  return <HeaderButton content={content} onPress={onPress} />
}

HeaderFilterButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default HeaderFilterButton
