import { TENANT_RECEIVED, TRACK_ROUTE, TRACK_POPULAR_ROUTE } from '../constants/ActionTypes'

let defaultState = {
  current: {},
  previous: {},
  popular: { current: {}, previous: {} }
}

const trackRoute = (state, action) => {
  if (isPopularRoute(action.route)) {
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

const trackPopularRoute = (state, action) => {
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

const isPopularRoute = (route) => {
  return route.key === 'popular'
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case TRACK_ROUTE:
      console.log('case TRACK_ROUTE')
      return trackRoute(state, action)
    case TRACK_POPULAR_ROUTE:
      console.log('case TRACK_POPULAR_ROUTE')
      return trackPopularRoute(state, action)
    case TENANT_RECEIVED:
      return {
        ...state,
        ...defaultState
      }
    default:
      return state
  }
}
