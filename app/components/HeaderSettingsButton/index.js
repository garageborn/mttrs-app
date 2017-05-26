import React, { Component, PropTypes } from 'react'
import { Image } from 'react-native'
import HeaderButton from '../HeaderButton'

class HeaderSettingsButton extends Component {
  render () {
    return <HeaderButton content={this.content} />
  }

  get content () {
    return <Image source={require('./assets/image.png')} />
  }
}

HeaderSettingsButton.propTypes = {
  onPress: PropTypes.func
}

export default HeaderSettingsButton
