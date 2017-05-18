import { REQUEST_FAVORITE_PUBLISHERS, FAVORITE_PUBLISHERS_RECEIVED } from '../constants/ActionTypes'

let defaultState = {
  isFetching: false, isLoaded: false, items: []
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case REQUEST_FAVORITE_PUBLISHERS:
      return {
        ...state,
        isFetching: true,
        isLoaded: false
      }
    case FAVORITE_PUBLISHERS_RECEIVED:
      return {
        ...state,
        isFetching: false,
        items: action.favoritePublishersStories,
        isLoaded: true
      }
    default:
      return state
  }
}
