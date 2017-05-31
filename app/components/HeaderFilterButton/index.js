import React, { Component, PropTypes } from 'react'
import { Image } from 'react-native'
import HeaderButton from '../HeaderButton'

class HeaderFilterButton extends Component {
  render () {
    const { onPress } = this.props
    return <HeaderButton content={this.content} onPress={onPress} />
  }

  get content () {
    return <Image source={require('./assets/image.png')} />
  }
}

HeaderFilterButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default HeaderFilterButton
