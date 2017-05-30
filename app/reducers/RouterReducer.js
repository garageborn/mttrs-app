import { TRACK_ROUTE } from '../constants/ActionTypes'
import _isEqual from 'lodash/isEqual'
let defaultState = { current: {}, last: {} }

export default function (state = defaultState, action) {
  switch (action.type) {
    case TRACK_ROUTE:
      if (_isEqual(state.current, action.route)) return { ...state }
      return {
        ...state,
        last: state.current,
        current: action.route
      }
    default:
      return state
  }
}
