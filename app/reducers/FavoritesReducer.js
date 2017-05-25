import { SELECT_FAVORITE_CATEGORY, TENANT_RECEIVED } from '../constants/ActionTypes'

let defaultState = { categoryId: null }

export default function (state = defaultState, action) {
  switch (action.type) {
    case SELECT_FAVORITE_CATEGORY:
      return {
        ...state,
        categoryId: action.categoryId
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
