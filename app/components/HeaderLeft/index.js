/* eslint-disable react/jsx-no-bind */
import React, { Component, PropTypes } from 'react'
import { BackHandler } from 'react-native'
import HeaderBackButton from '../HeaderBackButton'

class HeaderLeft extends Component {
  constructor () {
    super()
    this.onBackPress = this.onBackPress.bind(this)
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  render () {
    return <HeaderBackButton onPress={this.onBackPress} />
  }

  onBackPress () {
    const { navigation } = this.props
    navigation.goBack()
    return true
  }
}

HeaderLeft.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
}

export default HeaderLeft
