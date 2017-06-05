import Sentry from '../../config/Sentry'

export default function captureError (error) {
  if (__DEV__) return console.info('captureError', error)
  Sentry.captureException(new Error(error))
}
