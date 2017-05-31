import { TRACK_ROUTE } from '../constants/ActionTypes'
import _isEqual from 'lodash/isEqual'
import TimelineNavigator from '../navigators/TimelineNavigator'

let defaultState = {
  current: {},
  previous: {}
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case TRACK_ROUTE:
      if (_isEqual(state.current, action.route)) return { ...state }
      return {
        ...state,
        previous: { ...state.current },
        current: { ...action.route }
      }
    default:
      return state
  }
}
