import React, { Component } from 'react'
import { Platform } from 'react-native'
import Settings from '../../components/Settings'
import release from '../../config/release.json'

const appVersion = Platform.select({
  ios: release.ios.match(/\d+\.\d+/).toString(),
  android: release.android.match(/\d+\.\d+\.\d+/).toString()
})

class SettingsContainer extends Component {
  render () {
    return <Settings appVersion={appVersion} />
  }
}

export default SettingsContainer
