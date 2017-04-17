import {
  REQUEST_NOTIFICATIONS_TAGS,
  RECEIVE_NOTIFICATIONS_TAGS,
  RECEIVE_NOTIFICATIONS_PERMISSION
} from '../constants/ActionTypes'

let defaultState = {
  isFetching: false,
  isLoaded: false,
  enabled: false,
  tags: {}
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case REQUEST_NOTIFICATIONS_TAGS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_NOTIFICATIONS_TAGS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        tags: action.tags
      }
    case RECEIVE_NOTIFICATIONS_PERMISSION:
      return {
        ...state,
        enabled: action.enabled
      }
    default:
      return state
  }
}
