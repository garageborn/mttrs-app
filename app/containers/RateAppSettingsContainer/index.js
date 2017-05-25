import React, { Component } from 'react'
import { Linking, Platform } from 'react-native'
import * as StoreReview from 'react-native-store-review'
import RateAppSettings from '../../components/RateAppSettings'

const storeLink = Platform.select({
  ios: {
    native: 'itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=1166566093',
    external: 'https://itunes.apple.com/app/matters-news-summaries/id1166566093'
  },
  android: {
    native: 'market://details?id=garageborn.mttr.rs',
    external: 'https://play.google.com/store/apps/details?id=garageborn.mttrs'
  }
})

class RateAppSettingsContainer extends Component {
  constructor () {
    super()
    this.rateApp = this.rateApp.bind(this)
  }

  render () {
    return <RateAppSettings onPress={this.rateApp} />
  }

  rateApp () {
    if (StoreReview.isAvailable) return StoreReview.requestReview()
    this.openNative()
  }

  openNative () {
    Linking.canOpenURL(storeLink.native).then(supported => {
      if (supported) {
        Linking.openURL(storeLink.native)
      } else {
        this.openExternal()
      }
    }).catch()
  }

  openExternal () {
    Linking.canOpenURL(storeLink.external).then(supported => {
      if (supported) Linking.openURL(storeLink.external)
    }).catch()
  }
}

export default RateAppSettingsContainer
