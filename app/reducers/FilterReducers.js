import {SET_FILTER} from 'mttrs/app/constants/ActionTypes'

let defaultState = {
  filter: 'today'
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case SET_FILTER:
      return {...state, filter: action.filter}
    default:
      return state
  }
}
