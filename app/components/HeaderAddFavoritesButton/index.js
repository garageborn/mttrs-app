import React, { Component, PropTypes } from 'react'
import { Image } from 'react-native'
import HeaderButton from '../HeaderButton'

class HeaderAddFavoritesButton extends Component {
  render () {
    const { onPress } = this.props
    return <HeaderButton content={this.content} onPress={onPress} />
  }

  get content () {
    return <Image source={require('./assets/image.png')} />
  }
}

HeaderAddFavoritesButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default HeaderAddFavoritesButton
