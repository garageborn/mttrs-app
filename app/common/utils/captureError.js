import sentry from '../../config/sentry'
import { SentrySeverity } from 'react-native-sentry'

export default function captureError (error) {
  if (__DEV__) return console.info('captureError', error)
  sentry.captureMessage(new Error(error), {
    level: SentrySeverity.Warning
  })
}
