import { CURRENT_PUBLISHER_RECEIVED, CLEAR_CURRENT_PUBLISHER } from '../constants/ActionTypes'

let defaultState = {
  publisher: {}
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case CURRENT_PUBLISHER_RECEIVED:
      return { ...state, publisher: action.publisher }
    case CLEAR_CURRENT_PUBLISHER:
      return { ...state, publisher: {} }
    default:
      return state
  }
}
