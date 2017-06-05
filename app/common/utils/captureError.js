import sentry from '../../config/sentry'
import { stringify } from './Parser'
import { SentrySeverity } from 'react-native-sentry'
import _isError from 'lodash/isError'

export default function captureError (error) {
  if (__DEV__) return console.info('captureError', error)
  let message = error
  if (_isError(error)) message = stringify(error)
  sentry.captureMessage(message, {
    level: SentrySeverity.Warning
  })
}
