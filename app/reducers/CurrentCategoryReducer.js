import { CURRENT_CATEGORY_RECEIVED, CLEAR_CURRENT_CATEGORY } from '../constants/ActionTypes'

let defaultState = {
  category: {}
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case CURRENT_CATEGORY_RECEIVED:
      return { ...state, category: action.category }
    case CLEAR_CURRENT_CATEGORY:
      return { ...state, category: {} }
    default:
      return state
  }
}
