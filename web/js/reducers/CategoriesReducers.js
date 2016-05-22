import {CATEGORY_RECEIVED, RESET_CATEGORY} from 'constants/ActionTypes'

let defaultState = {
  category: null
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case CATEGORY_RECEIVED:
      return {...state, category: action.category}
    case RESET_CATEGORY:
      return {...state, category: defaultState.category}
    default:
      return state
  }
}
