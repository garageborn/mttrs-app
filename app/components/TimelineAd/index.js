import React, { Component } from 'react'
import { View } from 'react-native'
import { AdMobNativeExpress } from 'react-native-admob'
import { ADMOB_TIMELINE_AD_ID } from '../../constants/Ads'
import styles, { bannerWidth, bannerHeight } from './styles'

class TimelineAd extends Component {
  render () {
    return (
      <View style={styles.container}>
        <AdMobNativeExpress
          adUnitID={ADMOB_TIMELINE_AD_ID}
          bannerWidth={bannerWidth}
          bannerHeight={bannerHeight}
        />
      </View>
    )
  }
}

export default TimelineAd
