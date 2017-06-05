import { ROUTE_CHANGED, TRACK_ROUTE, TRACK_POPULAR_ROUTE } from '../constants/ActionTypes'
import _isEmpty from 'lodash/isEmpty'
import _isEqual from 'lodash/isEqual'
import { findRoute } from '../config/middlewares/routesTrackingMiddleware'

const trackRoute = (route) => ({
  type: TRACK_ROUTE,
  route
})

const trackPopularRoute = (route) => ({
  type: TRACK_POPULAR_ROUTE,
  route
})

const routeChanged = (route) => ({
  type: ROUTE_CHANGED
})

export function init () {
  return (dispatch, getState) => {
    const router = getRouter(getState)
    if (!_isEmpty(router.current)) return

    const route = findRoute(getNav(getState))
    dispatch(track(route))
  }
}

export function initPopular (route) {
  return (dispatch, getState) => {
    const router = getRouter(getState)
    if (!_isEmpty(router.popular.current)) return
    dispatch(trackPopular(route))
  }
}

export function track (route) {
  return (dispatch, getState) => {
    const router = getRouter(getState)
    if (_isEqual(router.current, route)) return
    dispatch(trackRoute(route))
    dispatch(routeChanged())
  }
}

export function trackPopular (route) {
  return (dispatch, getState) => {
    const router = getRouter(getState)
    if (_isEqual(router.popular.current, route)) return
    dispatch(trackPopularRoute(route))
    dispatch(routeChanged())
  }
}

function getNav (getState) {
  return getState().nav
}

function getRouter (getState) {
  return getState().RouterReducer
}
