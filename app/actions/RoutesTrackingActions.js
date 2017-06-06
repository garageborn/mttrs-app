import {
  INIT_ROUTE,
  INIT_POPULAR_ROUTE,
  TRACK_ROUTE,
  TRACK_POPULAR_ROUTE
} from '../constants/ActionTypes'
import { findRoute } from '../config/middlewares/routesTrackingMiddleware'

export const initRoute = (route) => ({
  type: INIT_ROUTE,
  route
})

export function init () {
  return (dispatch, getState) => {
    const route = findRoute(getState().nav)
    dispatch(initRoute(route))
  }
}

export const initPopular = (route) => ({
  type: INIT_POPULAR_ROUTE,
  route
})

export const track = (route) => ({
  type: TRACK_ROUTE,
  route
})

export const trackPopular = (route) => ({
  type: TRACK_POPULAR_ROUTE,
  route
})
