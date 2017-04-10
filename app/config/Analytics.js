import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge'
let analyticsId = 'UA-88576828-1'
if (this.__DEV__) analyticsId = ''

let tracker = new GoogleAnalyticsTracker(analyticsId)
tracker.allowIDFA(true)
export default tracker
