import {
  REQUEST_VISITED_STORIES,
  VISITED_STORIES_RECEIVED,
  SHOW_ONBOARDING,
  REQUEST_ONBOARDING,
  REQUEST_NOTIFICATION_STATUS,
  RECEIVE_NOTIFICATION_STATUS
} from '../constants/ActionTypes'

let defaultState = {
  visitedStories: { isFetching: false, isLoaded: false, items: [] },
  onboarding: { isFetching: false, show: false }
}

export default function (state = defaultState, action) {
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
    case REQUEST_ONBOARDING:
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          isFetching: true
        }
      }
    case SHOW_ONBOARDING:
      return {
        ...state,
        onboarding: {
          isFetching: false,
          show: action.show
        }
      }
    case REQUEST_NOTIFICATION_STATUS:
      return {
        ...state,
        notificationStatus: {
          isFetching: true
        }
      }
    case RECEIVE_NOTIFICATION_STATUS:
      return {
        ...state,
        notificationStatus: {
          isFetching: false,
          active: action.payload
        }
      }
    default:
      return state
  }
}
