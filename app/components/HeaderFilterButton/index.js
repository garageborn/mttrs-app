import React, { Component, PropTypes } from 'react'
import { Image } from 'react-native'
import HeaderButton from '../HeaderButton'

class HeaderFilterButton extends Component {
  render () {
    return <HeaderButton content={this.content} />
  }

  get content () {
    return <Image source={require('./assets/image.png')} />
  }
}

HeaderFilterButton.propTypes = {
  onPress: PropTypes.func
}

export default HeaderFilterButton
