import { Platform } from 'react-native'
import { Sentry } from 'react-native-sentry'

const dnsKey = Platform.select({
  ios: 'https://5409c6397ca84bf890d111fa5d505875:b0bb65b6c8ba42eabffb4e0821bb055f@sentry.io/172813',
  android: 'https://18690aa15041497eb618da54dd976bbf:f8da59dea10d4748bf1726dfbaa92ce4@sentry.io/172809'
})

if (!__DEV__) Sentry.config(dnsKey).install()

export default Sentry
