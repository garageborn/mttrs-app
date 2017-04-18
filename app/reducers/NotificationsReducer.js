import { Platform } from 'react-native'
import {
  REQUEST_NOTIFICATIONS_TAGS,
  RECEIVE_NOTIFICATIONS_TAGS,
  REQUEST_NOTIFICATIONS_PERMISSIONS,
  RECEIVE_NOTIFICATIONS_PERMISSIONS
} from '../constants/ActionTypes'

const permissions = Platform.select({
  ios: { isFetching: false, isLoaded: false, enabled: false },
  android: { isFetching: false, isLoaded: true, enabled: true }
})
const tags = {
  isFetching: false,
  isLoaded: false,
  values: { mttrs_br: 'false', mttrs_us: 'false' }
}

let defaultState = { permissions, tags }

export default function (state = defaultState, action) {
  switch (action.type) {
    case REQUEST_NOTIFICATIONS_PERMISSIONS:
      return {
        ...state,
        permissions: {
          ...state.permissions,
          isFetching: true
        }
      }
    case RECEIVE_NOTIFICATIONS_PERMISSIONS:
      return {
        ...state,
        permissions: {
          ...state.permissions,
          isFetching: false,
          isLoaded: true,
          enabled: action.enabled
        }
      }
    case REQUEST_NOTIFICATIONS_TAGS:
      return {
        ...state,
        tags: {
          ...state.tags,
          isFetching: true
        }
      }
    case RECEIVE_NOTIFICATIONS_TAGS:
      return {
        ...state,
        tags: {
          ...state.tags,
          isFetching: false,
          isLoaded: true,
          values: action.tags
        }
      }
    default:
      return state
  }
}
