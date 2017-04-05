import { REQUEST_TENANT, TENANT_RECEIVED } from '../constants/ActionTypes'
import Tenant from '../common/utils/Tenant'

let defaultState = {
  isFetching: false, isLoaded: false, id: null
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case REQUEST_TENANT:
      return {
        ...state,
        isFetching: true,
        isLoaded: false
      }
    case TENANT_RECEIVED:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        id: action.tenant
      }
    default:
      return state
  }
}
