import {
  REQUEST_NOTIFICATIONS_STATUS,
  RECEIVE_NOTIFICATIONS_STATUS,
  RECEIVE_NOTIFICATIONS_PERMISSIONS
} from '../constants/ActionTypes'

let defaultState = {
  isFetching: false,
  isLoaded: false,
  permissions: false,
  status: {}
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case REQUEST_NOTIFICATIONS_STATUS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_NOTIFICATIONS_STATUS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        status: action.payload
      }
    case RECEIVE_NOTIFICATIONS_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload
      }
    default:
      return state
  }
}
