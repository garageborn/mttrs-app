import React, { Component, PropTypes } from 'react'
import { Image } from 'react-native'
import HeaderButton from '../HeaderButton'

class HeaderBackButton extends Component {
  render () {
    return <HeaderButton onPress={this.props.onPress} content={this.content} />
  }

  get content () {
    return <Image source={require('./assets/image.png')} />
  }
}

HeaderBackButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default HeaderBackButton
