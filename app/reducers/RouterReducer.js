import {
  INIT_ROUTE,
  INIT_POPULAR_ROUTE,
  TRACK_ROUTE,
  TRACK_POPULAR_ROUTE
} from '../constants/ActionTypes'
import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'

let defaultState = {
  current: {},
  previous: {},
  popular: { current: {}, previous: {} }
}

const initRoute = (state, action) => {
  if (!_isEmpty(state.current)) return { ...state }
  return {
    ...state,
    current: { ...action.route }
  }
}

const trackRoute = (state, action) => {
  console.info('    # trackRoute', action.route)
  if (_isEqual(state.current, action.route)) return { ...state }
  if (action.route.key === 'popular') {
    return {
      ...state,
      previous: { ...state.current },
      current: { ...state.popular.current }
    }
  }
  return {
    ...state,
    previous: { ...state.current },
    current: { ...action.route }
  }
}

const initPopularRoute = (state, action) => {
  if (!_isEmpty(state.popular.current)) return { ...state }
  return {
    ...state,
    popular: {
      ...state.popular,
      current: { ...action.route }
    }
  }
}

const trackPopularRoute = (state, action) => {
  console.log('    # trackPopularRoute', action.route)
  if (_isEqual(state.popular.current, action.route)) return { ...state }
  return {
    ...state,
    previous: { ...state.current },
    current: { ...action.route },
    popular: {
      ...state.popular,
      previous: { ...state.popular.current },
      current: { ...action.route }
    }
  }
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case INIT_ROUTE:
      console.log('-----------INIT_ROUTE')
      return initRoute(state, action)
    case INIT_POPULAR_ROUTE:
      console.log('-----------INIT_POPULAR_ROUTE')
      return initPopularRoute(state, action)
    case TRACK_ROUTE:
      return trackRoute(state, action)
    case TRACK_POPULAR_ROUTE:
      return trackPopularRoute(state, action)
    default:
      return state
  }
}
