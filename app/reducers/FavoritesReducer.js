import { SELECT_FAVORITE_CATEGORY, TENANT_RECEIVED } from '../constants/ActionTypes'

let defaultState = { category: null }

export default function (state = defaultState, action) {
  switch (action.type) {
    case SELECT_FAVORITE_CATEGORY:
      return {
        ...state,
        category: action.category
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