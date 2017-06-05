import _result from 'lodash/result'
import Sentry from '../Sentry'

const getContext = (state, action) => {
  return {
    screen: _result(state, 'RouterReducer.current.routeName'),
    previousScreen: _result(state, 'RouterReducer.previous.routeName'),
    tenant: _result(state, 'TenantReducer.current.id'),
    action: _result(action, 'type')
  }
}

const sentryContext = ({ getState, dispatch }) => next => (action) => {
  const result = next(action)
  if (!__DEV__) Sentry.setExtraContext(getContext(getState(), action))
  return result
}

export default sentryContext
