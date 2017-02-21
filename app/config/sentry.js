import { Platform } from 'react-native'
import Raven from 'raven-js'
require('raven-js/plugins/react-native')(Raven)
import release from './release.json'

const currentRelease = Platform.select({
  ios: release.ios,
  android: release.android
})

if (!__DEV__) {
  const DSN_KEY = 'https://5cdede7e751f4807b1113013db2d917b@sentry.io/87957'
  Raven.config(DSN_KEY, { release: currentRelease }).install()
}

export default Raven
