import {
  REQUEST_NOTIFICATIONS_STATUS,
  RECEIVE_NOTIFICATIONS_STATUS
} from '../constants/ActionTypes'

let defaultState = {
  notificationsStatus: { isFetching: false, isLoaded: false, status: {} }
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case REQUEST_NOTIFICATIONS_STATUS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_NOTIFICATIONS_STATUS:
      console.log(action.payload)
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        status: action.payload
      }
    default:
      return state
  }
}
