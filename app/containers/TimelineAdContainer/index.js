import React, { Component } from 'react'
import { Text, View } from 'react-native'
// import { NativeAdsManager } from 'react-native-fbads'
import TimelineAd from '../../components/TimelineAd'
import { TIMELINE_AD_PLACEMENT_ID } from '../../constants/Ads'
import { AdMobBanner } from 'react-native-admob'

class TimelineAdContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // adsManager: new NativeAdsManager(TIMELINE_AD_PLACEMENT_ID, 1)
    }
  }

  render () {
    return (
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-1344834931417489/9517633655"
        testDeviceID="EMULATOR"
        didFailToReceiveAdWithError={this.bannerError}
      />
    )
    // return <TimelineAd adsManager={this.state.adsManager} />
  }

  bannerError(e) {
    console.log('banner error', e)
  }
}

export default TimelineAdContainer
