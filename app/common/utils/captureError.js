import sentry from '../../config/sentry'

export default function captureError (error) {
  if (__DEV__) console.info('captureError', error)
  sentry.captureException(error)
}
