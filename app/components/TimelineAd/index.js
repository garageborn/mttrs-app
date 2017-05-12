import React, { Component } from 'react'
import { Platform, View } from 'react-native'
import { AdMobNativeExpress } from 'react-native-admob'
import { ADMOB_TIMELINE_AD_ID } from '../../constants/Ads'
import captureError from '../../common/utils/captureError'
import styles, { bannerWidth, bannerHeight } from './styles'

class TimelineAd extends Component {
  constructor () {
    super()
    this.state = { error: false }
    this.handleError = this.handleError.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.state.error !== nextState.error
  }

  render () {
    if (Platform.OS === 'ios') return null
    if (this.state.error) return null
    return (
      <View style={styles.container}>
        <AdMobNativeExpress
          adUnitID={ADMOB_TIMELINE_AD_ID}
          bannerWidth={bannerWidth}
          bannerHeight={bannerHeight}
          didFailToReceiveAdWithError={this.handleError}
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
