import {CATEGORY_RECEIVED} from 'mttrs/app/constants/ActionTypes'

let defaultState = {
  category: null
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case CATEGORY_RECEIVED:
      return {...state, category: action.category}
    default:
      return state
  }
}
