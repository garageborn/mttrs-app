import { NavigationActions } from 'react-navigation'
import { RoutesTrackingActions } from '../../actions/index'
import _isInteger from 'lodash/isInteger'

const actions = [NavigationActions.INIT, NavigationActions.NAVIGATE, NavigationActions.BACK]

const findRoute = (nav) => {
  const route = nav.routes[nav.index]
  if (_isInteger(route.index)) return findRoute(route)
  return route
}

const routesTracking = ({ getState, dispatch }) => next => (action) => {
  if (actions.indexOf(action.type) === -1) return next(action)

  const currentRoute = findRoute(getState().nav)
  const result = next(action)
  const nextRoute = findRoute(getState().nav)
  if (nextRoute !== currentRoute) dispatch(RoutesTrackingActions.track(nextRoute))

  return result
}

export default routesTracking
