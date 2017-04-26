import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NativeAdsManager, AdSettings } from 'react-native-fbads'
import TimelineAd from '../../components/TimelineAd'
import { TIMELINE_AD_PLACEMENT_ID } from '../../constants/Ads'

class TimelineAdContainer extends Component {
  constructor (props) {
    super(props)
    if (this.__DEV__) AdSettings.addTestDevice(AdSettings.currentDeviceHash)

    this.state = {
      adsManager: new NativeAdsManager('1273521846029294_1297753870272758', 1)
    }
  }

  render () {
    return <TimelineAd adsManager={this.state.adsManager} />
  }
}

export default TimelineAdContainer
