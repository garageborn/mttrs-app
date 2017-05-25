import { ASSIGN_TENANT, TENANT_RECEIVED, REQUEST_TENANT } from '../constants/ActionTypes'

let defaultState = {
  isFetching: false, isLoaded: false, isAssigning: false, current: {}
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case REQUEST_TENANT:
      return {
        ...state,
        isFetching: true,
        isLoaded: false
      }
    case ASSIGN_TENANT:
      return {
        ...state,
        isAssigning: true,
        isLoaded: false
      }
    case TENANT_RECEIVED:
      return {
        ...state,
        isFetching: false,
        isAssigning: false,
        isLoaded: true,
        current: action.tenant
      }
    default:
      return state
  }
}
