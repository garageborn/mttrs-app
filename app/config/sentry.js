import { Platform } from 'react-native'
import { Sentry } from 'react-native-sentry'
import release from './release.json'

const currentRelease = Platform.select({
  ios: release.ios,
  android: release.android
})

// if (!__DEV__) {
  const DSN_KEY = 'https://5cdede7e751f4807b1113013db2d917b@sentry.io/87957'
  Sentry.config(DSN_KEY, { release: currentRelease }).install()
// }

export default Sentry
