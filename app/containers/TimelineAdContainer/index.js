import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NativeAdsManager } from 'react-native-fbads'
import TimelineAd from '../../components/TimelineAd'
import { TIMELINE_AD_PLACEMENT_ID } from '../../constants/Ads'

class TimelineAdContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      adsManager: new NativeAdsManager(TIMELINE_AD_PLACEMENT_ID, 1)
    }
  }

  render () {
    return <TimelineAd adsManager={this.state.adsManager} />
  }
}

export default TimelineAdContainer
