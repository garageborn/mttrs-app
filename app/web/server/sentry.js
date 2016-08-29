import raven from 'raven'
let sentry

if (process.env.NODE_ENV === 'production') {
  sentry = new raven.Client(process.env.MTTRS_FRONTEND_SENTRY_DSN)
  sentry.patchGlobal()
}

module.exports = sentry
