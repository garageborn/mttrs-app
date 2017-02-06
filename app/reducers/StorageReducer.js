import { REQUEST_VISITED_STORIES, VISITED_STORIES_RECEIVED,
  REQUEST_FAVORITE_PUBLISHERS, FAVORITE_PUBLISHERS_RECEIVED,
  REQUEST_TENANT, TENANT_RECEIVED, SHOW_ONBOARDING, REQUEST_ONBOARDING, HIDE_ONBOARDING } from '../constants/ActionTypes'

let defaultState = {
  visitedStories: { isFetching: false, isLoaded: false, items: [] },
  favoritePublishers: { isFetching: false, isLoaded: false, items: [] },
  tenant: { isFetching: false, isLoaded: false, name: '' },
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
    case REQUEST_FAVORITE_PUBLISHERS:
      return {
        ...state,
        favoritePublishers: {
          ...state.favoritePublishers,
          isFetching: true,
          isLoaded: false
        }
      }
    case FAVORITE_PUBLISHERS_RECEIVED:
      return {
        ...state,
        favoritePublishers: {
          ...state.favoritePublishers,
          isFetching: false,
          items: action.favoritePublishers,
          isLoaded: true
        }
      }
    case REQUEST_TENANT:
      return {
        ...state,
        tenant: {
          ...state.tenant,
          isFetching: true,
          isLoaded: false
        }
      }
    case TENANT_RECEIVED:
      return {
        ...state,
        tenant: {
          ...state.tenant,
          isFetching: false,
          name: action.tenant,
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
    default:
      return state
  }
}
