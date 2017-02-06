import sentry from '../../config/sentry'

export default function captureError (error) {
  sentry.captureException(error)
}
