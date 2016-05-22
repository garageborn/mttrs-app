import {RESET_FILTER, SET_FILTER} from 'constants/ActionTypes'

let defaultState = {
  filter: 'today'
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case RESET_FILTER:
      return {...state, filter: defaultState.filter}
    case SET_FILTER:
      return {...state, filter: action.filter}
    default:
      return state
  }
}
