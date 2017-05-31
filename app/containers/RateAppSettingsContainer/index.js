import React, { Component } from 'react'
import { Linking, Platform } from 'react-native'
import RateAppSettings from '../../components/RateAppSettings'

const storeLink = Platform.select({
  ios: {
    external: 'https://itunes.apple.com/pt/app/matters-resumo-de-not%C3%ADcias/id1166566093?mt=8'
  },
  android: {
    external: 'https://play.google.com/store/apps/details?id=garageborn.mttrs'
  }
})

class RateAppSettingsContainer extends Component {
  constructor () {
    super()
    this.openUrl = this.openUrl.bind(this)
  }

  render () {
    return <RateAppSettings onPress={this.openUrl} />
  }

  openUrl () {
    Linking.canOpenURL(storeLink.external).then(supported => {
      if (supported) Linking.openURL(storeLink.external)
    }).catch()
  }
}

export default RateAppSettingsContainer
