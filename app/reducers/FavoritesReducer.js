import { SELECT_FAVORITE_CATEGORY, TENANT_RECEIVED } from '../constants/ActionTypes'

let defaultState = { selectedCategory: null }

export default function (state = defaultState, action) {
  switch (action.type) {
    case SELECT_FAVORITE_CATEGORY:
      return {
        ...state,
        selectedCategory: action.category
      }
    case TENANT_RECEIVED:
      return {
        ...state,
        ...defaultState
      }
    default:
      return state
  }
}
