/* eslint-disable react/jsx-no-bind */

import React, { Component } from 'react'
import { View } from 'react-native'
import { AdMobNativeExpress } from 'react-native-admob'
import { ADMOB_TIMELINE_AD_ID } from '../../constants/Ads'
import captureError from '../../common/utils/captureError'
import styles, { bannerWidth, bannerHeight } from './styles'

class TimelineAd extends Component {
  constructor () {
    super()
    this.handleError = this.handleError.bind(this)
    this.state = { error: false }
  }

  render () {
    if (this.state.error) return null
    return (
      <View style={styles.container}>
        <AdMobNativeExpress
          adUnitID={ADMOB_TIMELINE_AD_ID}
          bannerWidth={bannerHeight}
          bannerHeight={bannerWidth}
          onDidFailToReceiveAdWithError={(event) => this.handleError(event.nativeEvent.error)}
        />
      </View>
    )
  }

  handleError (error) {
    captureError(error)
    this.setState({ error: true })
  }
}

export default TimelineAd
