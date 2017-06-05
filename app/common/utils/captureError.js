import sentry from '../../config/sentry'

export default function captureError (error) {
  if (__DEV__) return console.info('captureError', error)
  sentry.captureException(new Error(error))
}
