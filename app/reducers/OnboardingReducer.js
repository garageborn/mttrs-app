import { SHOW_ONBOARDING, REQUEST_ONBOARDING } from '../constants/ActionTypes'

let defaultState = {
  isFetching: false, show: false
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case REQUEST_ONBOARDING:
      return {
        ...state,
        ...state.onboarding,
        isFetching: true
      }
    case SHOW_ONBOARDING:
      return {
        ...state,
        isFetching: false,
        show: action.show
      }
    default:
      return state
  }
}
