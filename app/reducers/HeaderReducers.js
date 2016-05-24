import {HEADER_CATEGORIES_RECEIVED} from 'mttrs/app/constants/ActionTypes'

let defaultState = {
  categories: []
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case HEADER_CATEGORIES_RECEIVED:
      return {...state, categories: action.categories}
    default:
      return state
  }
}
