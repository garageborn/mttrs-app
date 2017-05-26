import { SELECT_CATEGORY_TAG, TENANT_RECEIVED } from '../constants/ActionTypes'

let defaultState = {
  selectedTags: {}
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case SELECT_CATEGORY_TAG:
      return {
        ...state,
        selectedTags: {
          ...state.selectedTags,
          [action.category.id]: action.tag
        }
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
