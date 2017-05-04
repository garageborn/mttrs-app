import React, { Component } from 'react'
import { View } from 'react-native'
import { AdMobNativeExpress } from 'react-native-admob'
import { ADMOB_TIMELINE_AD_ID } from '../../constants/Ads'
import styles from './styles'

class TimelineAd extends Component {
  render () {
    return (
      <View style={styles.container}>
        <AdMobNativeExpress
          adUnitID={ADMOB_TIMELINE_AD_ID}
          adViewDidReceiveAd={ (e) => console.log('adViewDidReceiveAd', e) }
          didFailToReceiveAdWithError={ (e) => console.log('didFailToReceiveAdWithError', e) }
          adViewWillPresentScreen={ (e) => console.log('adViewWillPresentScreen', e) }
          adViewWillDismissScreen={ (e) => console.log('adViewWillDismissScreen', e) }
          adViewDidDismissScreen={ (e) => console.log('adViewDidDismissScreen', e) }
          adViewWillLeaveApplication={ (e) => console.log('adViewWillLeaveApplication', e) }
          bannerWidth={styles.bannerWidth}
          bannerHeight={styles.bannerHeight}
        />
      </View>
    )
  }
}

export default TimelineAd
