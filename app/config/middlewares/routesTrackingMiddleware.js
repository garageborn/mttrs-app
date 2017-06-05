import { NavigationActions } from 'react-navigation'
import { RoutesTrackingActions } from '../../actions/index'
import _isInteger from 'lodash/isInteger'

const actions = [NavigationActions.INIT, NavigationActions.NAVIGATE, NavigationActions.BACK]

export const findRoute = (nav) => {
  const route = nav.routes[nav.index]
  if (_isInteger(route.index)) return findRoute(route)
  return route
}

const routesTracking = ({ getState, dispatch }) => next => (action) => {
  console.log(action.type)
  if (actions.indexOf(action.type) === -1) {
    try {
      return next(action)
    }catch (error) {
      console.log('-----------------action', action)
      console.log(error)
    }
  }

  const currentRoute = findRoute(getState().nav)
  const result = next(action)
  const nextRoute = findRoute(getState().nav)
  if (nextRoute !== currentRoute) dispatch(RoutesTrackingActions.track(nextRoute))

  return result
}

export default routesTracking
