import raven from 'raven'
const sentry = new raven.Client(process.env.MTTRS_FRONTEND_SENTRY_DSN)

if (process.env.NODE_ENV === 'production') sentry.patchGlobal()

module.exports = sentry
