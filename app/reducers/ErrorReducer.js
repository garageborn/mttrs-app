import { SHOW_ERROR_DISCLAIMER, HIDE_ERROR_DISCLAIMER } from '../constants/ActionTypes'

let defaultState = {
  hasError: false
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case SHOW_ERROR_DISCLAIMER:
      return {
        ...state,
        hasError: true
      }
    case HIDE_ERROR_DISCLAIMER:
      return {
        ...state,
        hasError: false
      }
    default:
      return state
  }
}
