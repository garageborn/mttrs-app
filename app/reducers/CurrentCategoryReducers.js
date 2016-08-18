import {CURRENT_CATEGORY_RECEIVED} from '../constants/ActionTypes'

let defaultState = {
  category: null
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case CURRENT_CATEGORY_RECEIVED:
      return {...state, category: action.category}
    default:
      return state
  }
}
