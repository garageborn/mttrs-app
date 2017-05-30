import { NavigationActions } from 'react-navigation'
import { RoutesTrackingActions } from '../../actions/index'

const routesTracking = ({ getState, dispatch }) => next => (action) => {
  if (action.type !== NavigationActions.NAVIGATE && action.type !== NavigationActions.BACK) {
    return next(action)
  }

  const currentRoute = getState().nav.routes[getState().nav.index]
  const result = next(action)
  const nextRoute = getState().nav.routes[getState().nav.index]
  if (nextRoute !== currentRoute) dispatch(RoutesTrackingActions.track(nextRoute))

  return result
}

export default routesTracking
