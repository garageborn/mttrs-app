import { REQUEST_VISITED_STORIES, VISITED_STORIES_RECEIVED,
  REQUEST_FAVORITE_PUBLISHERS, FAVORITE_PUBLISHERS_RECEIVED } from '../../constants/ActionTypes'

let defaultState = {
  visitedStories: { isFetching: false, isLoaded: false, items: [] },
  favoritePublishers: { isFetching: false, isLoaded: false, items: [] }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_VISITED_STORIES:
      return {
        ...state,
        visitedStories: {
          ...state.visitedStories,
          isFetching: true,
          isLoaded: false
        }
      }
    case VISITED_STORIES_RECEIVED:
      return {
        ...state,
        visitedStories: {
          ...state.visitedStories,
          isFetching: false,
          items: action.visitedStories,
          isLoaded: true
        }
      }
    case REQUEST_FAVORITE_PUBLISHERS:
      return {
        ...state,
        favoritePublishers: {
          ...state.favoritePublishers,
          isFetching: true,
          isLoaded: false
        }
      }
    case VISITED_STORIES_RECEIVED:
      return {
        ...state,
        favoritePublishers: {
          ...state.favoritePublishers,
          isFetching: false,
          items: action.favoritePublishers,
          isLoaded: true
        }
      }
    default:
      return state
  }
}
