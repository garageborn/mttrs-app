import Sentry from '../../config/Sentry'
import { stringify } from './Parser'
import { SentrySeverity } from 'react-native-sentry'
import _isError from 'lodash/isError'

export default function captureError (error, context) {
  if (__DEV__) return console.info('captureError', error, context)
  let message = error
  if (_isError(error)) message = stringify(error)
  if (context) {
    Sentry.setExtraContext(context)
  }
  Sentry.captureMessage(message, {
    level: SentrySeverity.Warning
  })
}
