import { SHOW_ERROR_DISCLAIMER, RESET_ERROR_STATE } from '../constants/ActionTypes'

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
    case RESET_ERROR_STATE:
      return {
        ...state,
        hasError: false
      }
    default:
      return state
  }
}
