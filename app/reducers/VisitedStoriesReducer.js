import {
  REQUEST_VISITED_STORIES,
  VISITED_STORIES_RECEIVED
} from '../constants/ActionTypes'

let defaultState = {
  isFetching: false, isLoaded: false, items: []
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case REQUEST_VISITED_STORIES:
      return {
        ...state,
        isFetching: true,
        isLoaded: false
      }
    case VISITED_STORIES_RECEIVED:
      return {
        ...state,
        isFetching: false,
        items: action.visitedStories,
        isLoaded: true
      }
    default:
      return state
  }
}
