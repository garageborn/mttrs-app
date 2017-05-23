import {
  SELECT_FAVORITE_PUBLISHER,
  SELECT_FAVORITE_CATEGORY,
  TENANT_RECEIVED
} from '../constants/ActionTypes'

let defaultState = { categoryId: null, publisherId: null }

export default function (state = defaultState, action) {
  switch (action.type) {
    case SELECT_FAVORITE_PUBLISHER:
      return {
        ...state,
        publisherId: action.publisherId
      }
    case SELECT_FAVORITE_CATEGORY:
      return {
        ...state,
        categoryId: action.categoryId,
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
