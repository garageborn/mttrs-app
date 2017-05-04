import React, { Component } from 'react'
import { Text, View } from 'react-native'
import TimelineAd from '../../components/TimelineAd'
import { TIMELINE_AD_PLACEMENT_ID } from '../../constants/Ads'
import { AdMobNativeExpress } from 'react-native-admob'

class TimelineAdContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // adsManager: new NativeAdsManager(TIMELINE_AD_PLACEMENT_ID, 1)
    }
  }

  render () {
    // return null
    // return <TimelineAd adsManager={this.state.adsManager} />
    return (
      <AdMobNativeExpress
        style={{flex: 1, height: 400, width: 500}}
        adUnitID="ca-app-pub-1344834931417489/1634440052"
        adViewDidReceiveAd={ (e) => console.log('adViewDidReceiveAd', e) }
        didFailToReceiveAdWithError={ (e) => console.log('didFailToReceiveAdWithError', e) }
        adViewWillPresentScreen={ (e) => console.log('adViewWillPresentScreen', e) }
        adViewWillDismissScreen={ (e) => console.log('adViewWillDismissScreen', e) }
        adViewDidDismissScreen={ (e) => console.log('adViewDidDismissScreen', e) }
        adViewWillLeaveApplication={ (e) => console.log('adViewWillLeaveApplication', e) }
      />
    )
  }
}

export default TimelineAdContainer
