import React, { Component, PropTypes } from 'react'
import { Image } from 'react-native'
import HeaderButton from '../HeaderButton'

class HeaderFavoriteButton extends Component {
  render () {
    return <HeaderButton onPress={this.props.onPress} content={this.content} />
  }

  get content () {
    return <Image source={require('./assets/inactive.png')} />
  }
}

HeaderFavoriteButton.propTypes = {
  onPress: PropTypes.func
}

export default HeaderFavoriteButton
