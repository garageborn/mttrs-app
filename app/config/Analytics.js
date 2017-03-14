import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge'
let analyticsId = 'UA-88576828-1'
// if (this.__DEV__) analyticsId = ''
export default new GoogleAnalyticsTracker(analyticsId)
